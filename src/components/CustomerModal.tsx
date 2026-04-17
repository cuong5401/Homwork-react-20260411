import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    type SelectChangeEvent,
} from "@mui/material";
import type { CustomerFormData, CustomerFormErrors, CustomerModalProps } from "../units";

const defaultFormData: CustomerFormData = {
    name: "",
    email: "",
    address: "",
    phone: "",
    rank: "",
};

export default function CustomerModal({ open, onClose, onSubmit, initialData, mode }: CustomerModalProps) {
    const [formData, setFormData] = useState<CustomerFormData>(defaultFormData);
    const [errors, setErrors] = useState<CustomerFormErrors>({});

    useEffect(() => {
        if (!open) return;

        if (mode === "edit" && initialData) {
            setFormData({
                name: initialData.name,
                email: initialData.email,
                address: initialData.address,
                phone: initialData.phone,
                rank: initialData.rank,
            });
        } else {
            setFormData(defaultFormData);
        }

        setErrors({});
    }, [open, mode, initialData]);

    const validateForm = () => {
        const nextErrors: CustomerFormErrors = {};

        if (!formData.name.trim()) {
            nextErrors.name = "Ten khach hang la bat buoc";
        }

        if (!formData.email.trim()) {
            nextErrors.email = "Email la bat buoc";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            nextErrors.email = "Email khong hop le";
        }

        if (!formData.rank) {
            nextErrors.rank = "Hang khach hang la bat buoc";
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const updateField = (name: keyof CustomerFormData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        updateField(name as keyof CustomerFormData, value);
    };

    const handleRankChange = (e: SelectChangeEvent<string>) => {
        updateField("rank", e.target.value);
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        await onSubmit(formData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{mode === "add" ? "Them khach hang moi" : "Sua thong tin khach hang"}</DialogTitle>
            <DialogContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
                    {Object.keys(errors).length > 0 && <Alert severity="error">Vui long kiem tra cac truong bat buoc</Alert>}

                    <TextField
                        label="Ten khach hang *"
                        name="name"
                        value={formData.name}
                        onChange={handleTextChange}
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name}
                    />

                    <TextField
                        label="Email *"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleTextChange}
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email}
                    />

                    <TextField
                        label="Dia chi"
                        name="address"
                        value={formData.address}
                        onChange={handleTextChange}
                        fullWidth
                        multiline
                        rows={2}
                    />

                    <TextField label="So dien thoai" name="phone" value={formData.phone} onChange={handleTextChange} fullWidth />

                    <FormControl fullWidth error={!!errors.rank}>
                        <InputLabel>Hang *</InputLabel>
                        <Select name="rank" value={formData.rank} onChange={handleRankChange} label="Hang *">
                            <MenuItem value="">
                                <em>Khong chon</em>
                            </MenuItem>
                            <MenuItem value="GOLD">GOLD</MenuItem>
                            <MenuItem value="SILVER">SILVER</MenuItem>
                            <MenuItem value="BRONZE">BRONZE</MenuItem>
                        </Select>
                        {errors.rank && <FormHelperText>{errors.rank}</FormHelperText>}
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Huy</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    {mode === "add" ? "Them" : "Cap nhat"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
