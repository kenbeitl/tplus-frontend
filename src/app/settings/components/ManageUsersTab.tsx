'use client';

import { useSession } from '@/hooks/useSession';
import { useTranslations } from '@/contexts/AppContext';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { keycloakApiService } from '@/lib/keycloakApi';
import { Spacer, Tag } from "@/components";
import Modal from '@/components/Modal';
import { 
    Box, 
    Card, 
    Typography, 
    TextField, 
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Button,
    Chip,
    MenuItem,
    Select,
    FormControl
} from "@mui/material";
import { getSVGIcon } from "@/helpers/utils";
import theme from "@/theme/theme";
import { useMemo, useEffect, useState } from 'react';
import { Search, Edit, UserPlus, Users } from 'lucide-react';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    serviceAccess: string[];
    status: 'Active' | 'Inactive';
}

export default function ManageUsersTab() {
    const { data: session, tokenPayload } = useSession();
    const t = useTranslations();
    const { showSnackbar } = useSnackbar();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [nameFilter, setNameFilter] = useState('Name');
    const [roleFilter, setRoleFilter] = useState('All Roles');
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({ email: '', role: 'General' });
    const [submitting, setSubmitting] = useState(false);

    const translations = useMemo(() => {
        const page = t('pages.settings.manageUsers');
        return {
            page
        }
    }, [t])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const data = await keycloakApiService.getAllUsers();
                setUsers(data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                user.email.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesRole = roleFilter === 'All Roles' || user.role === roleFilter;
            return matchesSearch && matchesRole;
        });
    }, [users, searchQuery, roleFilter]);

    const handleOpenModal = () => {
        setFormData({ email: '', role: 'General' });
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setFormData({ email: '', role: 'General' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.email) {
            showSnackbar('Email is required', 'error');
            return;
        }

        try {
            setSubmitting(true);
            await keycloakApiService.createUser({
                email: formData.email,
                userRole: formData.role
            });
            showSnackbar('User invitation sent successfully!', 'success');
            handleCloseModal();
            // Refresh user list
            const data = await keycloakApiService.getAllUsers();
            setUsers(data);
        } catch (error: any) {
            console.error('Failed to create user:', error);
            showSnackbar(error.message || 'Failed to send invitation', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Card variant="outlined" className="p-6 card-hover">
            <Box component="div" className="flex items-center gap-2 mb-1!">
                <Users size={20} />
                <Typography variant="h6" component="h2">
                    {translations.page.title}
                </Typography>
            </Box>
            <Typography variant="body2" component="p" className="mb-6!">
                {translations.page.context}
            </Typography>

            {/* Search and Filters */}
            <Box component="div" className="flex flex-col sm:flex-row gap-3 mb-4!">
                <TextField
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search size={18} />
                                </InputAdornment>
                            ),
                        }
                    }}
                    sx={{ flex: 1 }}
                />
                <FormControl sx={{ minWidth: 150 }}>
                    <Select
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                        size="small"
                    >
                        <MenuItem value="Name">Name</MenuItem>
                        <MenuItem value="Email">Email</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 150 }}>
                    <Select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        size="small"
                    >
                        <MenuItem value="All Roles">All Roles</MenuItem>
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="General">General</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Users Table */}
            <TableContainer component={Paper} variant="outlined">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Service Access</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    <Typography variant="body2" color="text.secondary">
                                        Loading users...
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : filteredUsers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    <Typography variant="body2" color="text.secondary">
                                        No users found
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredUsers.map((user) => (
                                <TableRow key={user.id} hover>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={user.role}
                                            size="small"
                                            color={user.role === 'Admin' ? 'warning' : 'default'}
                                            sx={{ 
                                                bgcolor: user.role === 'Admin' ? '#FEF3C7' : '#F3F4F6',
                                                color: user.role === 'Admin' ? '#92400E' : '#374151',
                                                fontWeight: 500
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box component="div" className="flex gap-1 flex-wrap">
                                            {user.serviceAccess?.length > 0 ? (
                                                user.serviceAccess.map((service, idx) => (
                                                    <Chip
                                                        key={idx}
                                                        label={service}
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                ))
                                            ) : (
                                                <Chip label="All Services" size="small" variant="outlined" />
                                            )}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={user.status}
                                            size="small"
                                            color={user.status === 'Active' ? 'success' : 'default'}
                                            sx={{ 
                                                bgcolor: user.status === 'Active' ? '#D1FAE5' : '#F3F4F6',
                                                color: user.status === 'Active' ? '#065F46' : '#6B7280'
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Box component="div" className="flex gap-1 justify-end">
                                            <IconButton size="small" aria-label="edit user">
                                                <Edit size={18} />
                                            </IconButton>
                                            <IconButton size="small" aria-label="manage user">
                                                <UserPlus size={18} />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Footer */}
            <Box component="div" className="flex justify-between items-center mt-4!">
                <Typography variant="body2" color="text.secondary">
                    Showing {filteredUsers.length} of {users.length} users
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<UserPlus size={18} />}
                    onClick={handleOpenModal}
                    sx={{ bgcolor: theme.palette.primary.main }}
                >
                    Add User
                </Button>
            </Box>

            {/* Add User Modal */}
            <Modal open={openModal} onClose={handleCloseModal} maxWidth={500}>
                <Box component="form" onSubmit={handleSubmit}>
                    <Typography variant="h6" component="h2" className="mb-2!">
                        Add New User
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="mb-4!">
                        Add a new user to your organisation. An invitation email will be sent to the user.
                    </Typography>

                    <Box component="div" className="mb-4!">
                        <Typography variant="body2" className="mb-1!" sx={{ fontWeight: 500 }}>
                            Email <span style={{ color: theme.palette.error.main }}>*</span>
                        </Typography>
                        <TextField
                            fullWidth
                            type="email"
                            placeholder="user@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            disabled={submitting}
                        />
                    </Box>

                    <Box component="div" className="mb-4!">
                        <Typography variant="body2" className="mb-1!" sx={{ fontWeight: 500 }}>
                            Role
                        </Typography>
                        <FormControl fullWidth>
                            <Select
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                disabled={submitting}
                            >
                                <MenuItem value="General">General</MenuItem>
                                <MenuItem value="Admin">Admin</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic', display: 'block', mt: 1 }}>
                            Admin users automatically get full access to all services.
                        </Typography>
                    </Box>

                    <Box component="div" className="flex justify-end gap-2 mt-6!">
                        <Button
                            variant="outlined"
                            onClick={handleCloseModal}
                            disabled={submitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={submitting}
                            sx={{ bgcolor: theme.palette.primary.main }}
                        >
                            {submitting ? 'Sending...' : 'Add User'}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Card>
    );
}
