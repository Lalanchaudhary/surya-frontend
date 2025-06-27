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
    price: '',
    rating: 0,
    reviewCount: 0,
    image: '',
    description: '',
    label: '',
    flavour: '',
    sizes: [],
    ingredients: [],
    allergens: [],
    nutritionInfo: {
      calories: '',
      protein: '',
      carbs: '',
      fat: ''
    }
  });

  const [newSize, setNewSize] = useState({
    id: '',
    name: '',
    price: '',
    serves: ''
  });

  const [newIngredient, setNewIngredient] = useState('');
  const [newAllergen, setNewAllergen] = useState('');

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
      price: '',
      rating: 0,
      reviewCount: 0,
      image: '',
      description: '',
      label: '',
      flavour: '',
      sizes: [],
      ingredients: [],
      allergens: [],
      nutritionInfo: {
        calories: '',
        protein: '',
        carbs: '',
        fat: ''
      }
    });
    setDialogOpen(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      rating: product.rating,
      reviewCount: product.reviewCount,
      image: product.image,
      description: product.description || '',
      label: product.label || '',
      flavour: product.flavour || '',
      sizes: product.sizes || [],
      ingredients: product.ingredients || [],
      allergens: product.allergens || [],
      nutritionInfo: product.nutritionInfo || {
        calories: '',
        protein: '',
        carbs: '',
        fat: ''
      }
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
    if (name.startsWith('nutritionInfo.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        nutritionInfo: {
          ...prev.nutritionInfo,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddSize = () => {
    if (newSize.id && newSize.name && newSize.price && newSize.serves) {
      setFormData(prev => ({
        ...prev,
        sizes: [...prev.sizes, { ...newSize }]
      }));
      setNewSize({ id: '', name: '', price: '', serves: '' });
    }
  };

  const handleRemoveSize = (index) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index)
    }));
  };

  const handleAddIngredient = () => {
    if (newIngredient) {
      setFormData(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, newIngredient]
      }));
      setNewIngredient('');
    }
  };

  const handleRemoveIngredient = (index) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const handleAddAllergen = () => {
    if (newAllergen) {
      setFormData(prev => ({
        ...prev,
        allergens: [...prev.allergens, newAllergen]
      }));
      setNewAllergen('');
    }
  };

  const handleRemoveAllergen = (index) => {
    setFormData(prev => ({
      ...prev,
      allergens: prev.allergens.filter((_, i) => i !== index)
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
              <TableCell>Flavour</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Rating</TableCell>
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
                <TableCell>{product.flavour}</TableCell>
                <TableCell>₹{product.price.toFixed(2)}</TableCell>
                <TableCell>{product.rating}</TableCell>
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
                  label="Flavour"
                  name="flavour"
                  value={formData.flavour}
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
                  label="Label"
                  name="label"
                  value={formData.label}
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
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="Size ID"
                      value={newSize.id}
                      onChange={(e) => setNewSize(prev => ({ ...prev, id: e.target.value }))}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="Size Name"
                      value={newSize.name}
                      onChange={(e) => setNewSize(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="Price"
                      type="number"
                      value={newSize.price}
                      onChange={(e) => setNewSize(prev => ({ ...prev, price: e.target.value }))}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="Serves"
                      value={newSize.serves}
                      onChange={(e) => setNewSize(prev => ({ ...prev, serves: e.target.value }))}
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
                        primary={`${size.name} - ₹${size.price}`}
                        secondary={`Serves: ${size.serves}`}
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

              {/* Ingredients Section */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>Ingredients</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={9}>
                    <TextField
                      fullWidth
                      label="Ingredient"
                      value={newIngredient}
                      onChange={(e) => setNewIngredient(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={handleAddIngredient}
                      sx={{ height: '100%' }}
                    >
                      Add Ingredient
                    </Button>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {formData.ingredients.map((ingredient, index) => (
                    <Chip
                      key={index}
                      label={ingredient}
                      onDelete={() => handleRemoveIngredient(index)}
                    />
                  ))}
                </Box>
              </Grid>

              {/* Allergens Section */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>Allergens</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={9}>
                    <TextField
                      fullWidth
                      label="Allergen"
                      value={newAllergen}
                      onChange={(e) => setNewAllergen(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={handleAddAllergen}
                      sx={{ height: '100%' }}
                    >
                      Add Allergen
                    </Button>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {formData.allergens.map((allergen, index) => (
                    <Chip
                      key={index}
                      label={allergen}
                      onDelete={() => handleRemoveAllergen(index)}
                    />
                  ))}
                </Box>
              </Grid>

              {/* Nutrition Info Section */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>Nutrition Information</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="Calories"
                      name="nutritionInfo.calories"
                      value={formData.nutritionInfo.calories}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="Protein"
                      name="nutritionInfo.protein"
                      value={formData.nutritionInfo.protein}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="Carbs"
                      name="nutritionInfo.carbs"
                      value={formData.nutritionInfo.carbs}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      label="Fat"
                      name="nutritionInfo.fat"
                      value={formData.nutritionInfo.fat}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>
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