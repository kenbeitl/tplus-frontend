import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";

interface FormSelectOption {
    value: string;
    label: string;
}

interface FormSelectProps {
    name: string;
    label: string;
    value: string;
    onChange: (event: SelectChangeEvent) => void;
    options: FormSelectOption[];
    disabled?: boolean;
    required?: boolean;
    fullWidth?: boolean;
    error?: string;
    sx?: object;
}

export default function FormSelect({
    name,
    label,
    value,
    onChange,
    options,
    disabled = false,
    required = false,
    fullWidth = true,
    error,
    sx
}: FormSelectProps) {
    const labelId = `${name}-label`;

    return (
        <FormControl fullWidth={fullWidth} error={!!error} disabled={disabled}>
            <InputLabel id={labelId} required={required}>
                {label}
            </InputLabel>
            <Select
                labelId={labelId}
                name={name}
                label={label}
                value={value}
                onChange={onChange}
                disabled={disabled}
                sx={sx}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            {error && (
                <Typography component="span" variant="caption" className="text-red-600 mt-1 block">
                    {error}
                </Typography>
            )}
        </FormControl>
    );
}