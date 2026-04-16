import { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Alert,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
} from "@mui/material";

export default function CustomerModal({ open, onClose, onSubmit, initialData, mode }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
        rank: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (open) {
            if (mode === "edit" && initialData) {
                setFormData(initialData);
            } else {
                setFormData({
                    name: "",
                    email: "",
                    address: "",
                    phone: "",
                    rank: "",
                });
            }
            setErrors({});
        }
    }, [open, mode, initialData]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Tên khách hàng là bắt buộc";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email là bắt buộc";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Email không hợp lệ";
        }

        if (!formData.rank) {
            newErrors.rank = "Hạng khách hàng là bắt buộc";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Xóa lỗi khi người dùng bắt đầu nhập
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onSubmit(formData);
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{mode === "add" ? "Thêm khách hàng mới" : "Sửa thông tin khách hàng"}</DialogTitle>
            <DialogContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
                    {Object.keys(errors).length > 0 && <Alert severity="error">Vui lòng kiểm tra các trường bắt buộc</Alert>}

                    <TextField
                        label="Tên khách hàng *"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name}
                    />

                    <TextField
                        label="Email *"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email}
                    />

                    <TextField
                        label="Địa chỉ"
                        name="address"
                        value={formData.address || ""}
                        onChange={handleInputChange}
                        fullWidth
                        multiline
                        rows={2}
                    />

                    <TextField label="Số điện thoại" name="phone" value={formData.phone || ""} onChange={handleInputChange} fullWidth />

                    <FormControl fullWidth error={!!errors.rank}>
                        <InputLabel>Hạng *</InputLabel>
                        <Select name="rank" value={formData.rank || ""} onChange={handleInputChange} label="Hạng *">
                            <MenuItem value="">
                                <em>Không chọn</em>
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
                <Button onClick={onClose}>Hủy</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    {mode === "add" ? "Thêm" : "Cập nhật"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
