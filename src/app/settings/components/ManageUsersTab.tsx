'use client';

import { useSession } from '@/hooks/useSession';
import { useTranslations } from '@/contexts/AppContext';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { keycloakApiService, userRoles } from '@/lib/keycloakApi';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';
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
import theme from "@/theme/theme";
import { useMemo, useEffect, useState } from 'react';
import { Search, UserPlus } from 'lucide-react';
import { getSVGIcon } from '@/helpers/utils';

interface User {
    id: string;
    username: string;
    email: string;
    emailVerified: boolean;
    firstName: string;
    lastName: string;
    enabled: boolean;
    createdTimestamp: number;
    attributes?: {
        userRole?: string[];
        displayName?: string[];
    };
    totp: boolean;
    disableableCredentialTypes: string[];
    requiredActions: string[];
    notBefore: number;
}

interface DisplayUser {
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
    const [users, setUsers] = useState<DisplayUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [nameFilter, setNameFilter] = useState('Name');
    const [roleFilter, setRoleFilter] = useState('*');
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<DisplayUser | null>(null);

    const translations = useMemo(() => {
        const page = t('pages.settings.manageUsers');
        return {
            page
        }
    }, [t])

    // Transform Keycloak user data to display format
    const transformUsers = (keycloakUsers: User[]): DisplayUser[] => {
        return keycloakUsers.map(user => ({
            id: user.id,
            name: user.attributes?.displayName?.[0] || `${user.firstName} ${user.lastName}`,
            email: user.email,
            role: user.attributes?.userRole?.[0] || 'General',
            serviceAccess: [],
            status: user.enabled ? 'Active' : 'Inactive'
        }));
    };

    // Fetch and refresh user list
    const fetchAndRefreshUsers = async () => {
        try {
            const data = await keycloakApiService.getAllUsers();
            const extractedData: User[] = data[0]?.members;
            const displayUsers = transformUsers(extractedData);
            setUsers(displayUsers);
        } catch (error) {
            console.error('Failed to fetch users:', error);
            throw error;
        }
    };

    useEffect(() => {
        const loadUsers = async () => {
            try {
                setLoading(true);
                await fetchAndRefreshUsers();
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchesSearch = user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                user.email?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesRole = roleFilter === '*' || user.role === roleFilter;
            return matchesSearch && matchesRole;
        });
    }, [users, searchQuery, roleFilter]);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleOpenEditModal = (user: DisplayUser) => {
        setSelectedUser(user);
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setSelectedUser(null);
    };

    const handleUserAdded = async () => {
        try {
            await fetchAndRefreshUsers();
        } catch (error) {
            console.error('Failed to refresh users after adding:', error);
        }
    };

    const handleToggleUserStatus = async (userId: string, currentStatus: 'Active' | 'Inactive') => {
        try {
            if (currentStatus === 'Active') {
                await keycloakApiService.disableUser(userId);
                showSnackbar('User disabled successfully', 'success');
            } else {
                await keycloakApiService.enableUser(userId);
                showSnackbar('User enabled successfully', 'success');
            }
            
            await fetchAndRefreshUsers();
        } catch (error: any) {
            console.error('Failed to toggle user status:', error);
            showSnackbar(error.message || 'Failed to update user status', 'error');
        }
    };

    const handleUserUpdated = async () => {
        try {
            await fetchAndRefreshUsers();
        } catch (error) {
            console.error('Failed to refresh users after update:', error);
        }
    };

    return (
        <Card variant="outlined" className="p-6 card-hover">
            <Box component="div" className="flex items-center gap-2 mb-1">
                { getSVGIcon('users', 20) }
                <Typography variant="h6" component="h2">{translations.page.title}</Typography>
            </Box>
            <Typography variant="body2" component="p" className="mb-6!">{translations.page.context}</Typography>

            {/* Search and Filters */}
            <Box component="div" className="flex flex-col sm:flex-row gap-3 mb-4">
                <TextField
                    placeholder={translations.page.searchPlaceholder}
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
                        <MenuItem value={ translations.page.tableHeaders.name }>{ translations.page.tableHeaders.name }</MenuItem>
                        <MenuItem value={ translations.page.tableHeaders.email }>{ translations.page.tableHeaders.email }</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 150 }}>
                    <Select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        size="small"
                    >
                        <MenuItem value="*">{ translations.page.allRoles }</MenuItem>
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
                            <TableCell>{ translations.page.tableHeaders.name }</TableCell>
                            <TableCell>{ translations.page.tableHeaders.email }</TableCell>
                            <TableCell>{ translations.page.tableHeaders.role }</TableCell>
                            <TableCell>{ translations.page.tableHeaders.serviceAccess }</TableCell>
                            <TableCell>{ translations.page.tableHeaders.status }</TableCell>
                            <TableCell align="right">{ translations.page.tableHeaders.actions }</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    <Typography variant="body2" color="text.secondary">{ translations.page.loadingUsers}</Typography>
                                </TableCell>
                            </TableRow>
                        ) : filteredUsers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    <Typography variant="body2" color="text.secondary">{ translations.page.noUsersFound}</Typography>
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
                                                <Chip label={ translations.page.allServices } size="small" variant="outlined" />
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
                                        <Box component="div" className="flex gap-2 justify-end">
                                            {/* <IconButton 
                                                size="small" 
                                                aria-label="edit user" 
                                                className="p-2! border-2! border-gray-200! rounded-md! bg-slate-100!"
                                                onClick={() => handleOpenEditModal(user)}
                                            >
                                                { getSVGIcon('edit', 18) }
                                            </IconButton> */}
                                            {user.email !== tokenPayload?.email && (
                                                <IconButton 
                                                    size="small" 
                                                    aria-label={user.status === 'Active' ? 'disable user' : 'enable user'} 
                                                    className="p-2! border-2! border-gray-200! rounded-md! bg-slate-100!"
                                                    onClick={() => handleToggleUserStatus(user.id, user.status)}
                                                >
                                                    { getSVGIcon(user.status === 'Active' ? 'user-x' : 'user-check', 18) }
                                                </IconButton>
                                            )}
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
                    { translations.page.addUserButton }
                </Button>
            </Box>

            {/* Add User Modal */}
            <AddUserModal 
                open={openModal} 
                onClose={handleCloseModal}
                onUserAdded={handleUserAdded}
            />

            {/* Edit User Modal */}
            <EditUserModal
                open={openEditModal}
                onClose={handleCloseEditModal}
                onUserUpdated={handleUserUpdated}
                user={selectedUser}
            />
        </Card>
    );
}
