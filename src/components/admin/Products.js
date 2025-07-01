import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
  Grid,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import * as adminService from '../../services/adminService';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    flavor: '',
    price: '',
    original_price: '',
    image: '',
    rating: 0,
    reviews: 0,
    description: '',
    label: '',
    tag: '',
    sizes: [],
    product_details: []
  });

  const [newSize, setNewSize] = useState({
    size: '',
    price: '',
    price_adjustment: ''
  });
  const [newProductDetail, setNewProductDetail] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await adminService.getAllProducts();
      setProducts(data.products);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setFormData({
      name: '',
      flavor: '',
      price: '',
      original_price: '',
      image: '',
      rating: 0,
      reviews: 0,
      description: '',
      label: '',
      tag: '',
      sizes: [],
      product_details: []
    });
    setDialogOpen(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      flavor: product.flavor || '',
      price: product.price,
      original_price: product.original_price || '',
      image: product.image,
      rating: product.rating || 0,
      reviews: product.reviews || 0,
      description: product.description || '',
      label: product.label || '',
      tag: product.tag || '',
      sizes: product.sizes || [],
      product_details: product.product_details || []
    });
    setDialogOpen(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await adminService.deleteProduct(productId);
        await loadProducts();
      } catch (err) {
        setError(err.message || 'Failed to delete product');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedProduct) {
        await adminService.updateProduct(selectedProduct._id, formData);
      } else {
        await adminService.createProduct(formData);
      }
      setDialogOpen(false);
      await loadProducts();
    } catch (err) {
      setError(err.message || 'Failed to save product');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSize = () => {
    if (newSize.size && newSize.price && newSize.price_adjustment) {
      setFormData(prev => ({
        ...prev,
        sizes: [...prev.sizes, { ...newSize, price: Number(newSize.price), price_adjustment: Number(newSize.price_adjustment) }]
      }));
      setNewSize({ size: '', price: '', price_adjustment: '' });
    }
  };

  const handleRemoveSize = (index) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index)
    }));
  };

  const handleAddProductDetail = () => {
    if (newProductDetail) {
      setFormData(prev => ({
        ...prev,
        product_details: [...prev.product_details, newProductDetail]
      }));
      setNewProductDetail('');
    }
  };

  const handleRemoveProductDetail = (index) => {
    setFormData(prev => ({
      ...prev,
      product_details: prev.product_details.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mb={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          Products Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddProduct}
        >
          Add Product
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Flavor</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Original Price</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Reviews</TableCell>
              <TableCell>Label</TableCell>
              <TableCell>Tag</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: 50, height: 50, objectFit: 'cover' }}
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.flavor}</TableCell>
                <TableCell>₹{product.price.toFixed(2)}</TableCell>
                <TableCell>{product.original_price ? `₹${product.original_price.toFixed(2)}` : '-'}</TableCell>
                <TableCell>{product.rating}</TableCell>
                <TableCell>{product.reviews}</TableCell>
                <TableCell>{product.label}</TableCell>
                <TableCell>{product.tag}</TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleEditProduct(product)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedProduct ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Flavor"
                  name="flavor"
                  value={formData.flavor}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Original Price"
                  name="original_price"
                  type="number"
                  value={formData.original_price}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Label"
                  name="label"
                  value={formData.label}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tag"
                  name="tag"
                  value={formData.tag}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Rating"
                  name="rating"
                  type="number"
                  value={formData.rating}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Reviews"
                  name="reviews"
                  type="number"
                  value={formData.reviews}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Image URL"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              {/* Sizes Section */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>Sizes</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Size"
                      value={newSize.size}
                      onChange={(e) => setNewSize(prev => ({ ...prev, size: e.target.value }))}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Price"
                      type="number"
                      value={newSize.price}
                      onChange={(e) => setNewSize(prev => ({ ...prev, price: e.target.value }))}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Price Adjustment"
                      type="number"
                      value={newSize.price_adjustment}
                      onChange={(e) => setNewSize(prev => ({ ...prev, price_adjustment: e.target.value }))}
                    />
                  </Grid>
                </Grid>
                <Button
                  variant="outlined"
                  onClick={handleAddSize}
                  sx={{ mt: 1 }}
                >
                  Add Size
                </Button>
                <List>
                  {formData.sizes.map((size, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`${size.size} - ₹${size.price} (Adj: ₹${size.price_adjustment})`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={() => handleRemoveSize(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Grid>

              {/* Product Details Section */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>Product Details</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={9}>
                    <TextField
                      fullWidth
                      label="Product Detail"
                      value={newProductDetail}
                      onChange={(e) => setNewProductDetail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={handleAddProductDetail}
                      sx={{ height: '100%' }}
                    >
                      Add Detail
                    </Button>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {formData.product_details.map((detail, index) => (
                    <Chip
                      key={index}
                      label={detail}
                      onDelete={() => handleRemoveProductDetail(index)}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {selectedProduct ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Products; 