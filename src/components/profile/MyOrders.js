import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import * as userService from '../../services/userService';
import { 
  FiEye, 
  FiX, 
  FiTruck, 
  FiCheckCircle, 
  FiClock,
  FiPackage
} from 'react-icons/fi';
import logo from '../../assets/suryalogo.png'
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';

const OrderDetail = ({ order, onClose, onCancel }) => {
  const [cancelDialog, setCancelDialog] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState(null);

  const getStatusStep = (status) => {
    switch (status) {
      case 'Pending':
        return 0;
      case 'Processing':
        return 1;
      case 'Shipped':
        return 2;
      case 'Delivered':
        return 3;
      case 'Cancelled':
        return -1;
      default:
        return 0;
    }
  };

  const handleCancelOrder = async () => {
    try {
      setCancelling(true);
      await userService.cancelOrder(order.id);
      onCancel();
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to cancel order');
    } finally {
      setCancelling(false);
      setCancelDialog(false);
    }
  };

  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: 'Helvetica',
    },
    titleView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 10,
      borderBottomWidth: 1
    },
    logo: {
      height:75
    },
    title: {
      fontSize: 40,
      marginBottom: 20,
      fontWeight: 'bold',
      color: '#3871c1'
    },
    invoiceDetails: {
      fontSize: 10,
      marginBottom: 10,
    },
    billTo: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    table: {
      display: 'flex',
      width: '100%',
      marginVertical: 20,
    },
    tableRow: {
      flexDirection: 'row',
      backgroundColor: '#3871c1'
    },
    tableColHeader: {
      fontSize: 10,
      borderRightWidth: 0.5,
      padding: 5,
      textAlign: 'center',
      fontWeight: 'bold',
      color: '#fff'
    },
    tableRow1: {
      flexDirection: 'row',
    },
    tableColHeader1: {
      fontSize: 10,
      borderColor: '#bedef1',
      borderRightWidth: 1,
      padding: 5,
      textAlign: 'center'
    },
    tableColHeader2: {
      fontSize: 10,
      borderColor: '#bedef1',
      borderRightWidth: 1,
      padding: 5,
      textAlign: 'center',
    },
    tableCol: {
      width: '33%',
    },
    footer: {
      position: 'absolute',
      bottom: 20,
      width: '100%'
    },
    subtotalHeadRow: {

    },
    subtotalRow: {
      width: 150,
      flexDirection: 'row',
      // borderBottomWidth: 0.4,
      paddingBottom: 5,
      justifyContent: 'space-around',
      marginTop: 7,
      marginLeft: 50
    },
    subtotalRow1: {
      width: 200,
      flexDirection: 'row',
      // borderBottomWidth: 0.4,
      justifyContent: 'space-around',
      marginTop: 7,
      fontWeight: 'bold',
      backgroundColor: '#3871c1',
      padding: 2
    },
    footerInner: {
      width: '88%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      fontSize: 10,
      padding: 10,
      paddingBottom: 0
    },
    bold: {
      fontWeight: 'bold',
    },
  });

  // Invoice PDF Component
  // const Invoice = ({ order }) => {
  //   // Prepare billData from order
  //   const billData = {
  //     customer: {
  //       displayName: order.user?.name || order.userName || 'Customer',
  //       mobile: order.user?.phoneNumber || '',
  //       email: order.user?.email || '',
  //     },
  //     invoiceNumber: order.orderId || order.id || '',
  //     invoiceDate: order.createdAt,
  //     items: order.items.map(item => ({
  //       itemDetails: item.product.name,
  //       quantity: item.quantity,
  //       rate: item.price,
  //       amount: item.price * item.quantity,
  //     })),
  //     subTotal: order.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  //     taxRate: order.taxRate || 0,
  //     tax: order.tax || 0,
  //     total: order.totalAmount || 0,
  //     shipping:order.shippingcharge|| 0
  //   };

  //   return (
  //     <Document>
  //       <Page size="A4" style={styles.page}>
  //         {/* Invoice Title */}
  //         <View style={styles.titleView}>
  //           <Image src={logo} style={styles.logo} />
  //           <Text style={styles.title}>Invoice</Text>
  //         </View>
  //         {/* Bill To */}
  //         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
  //           <View>
  //             <Text style={styles.billTo}>Bill To:</Text>
  //             <Text style={{ fontSize: 16, marginVertical: 5, fontWeight: 'bold' }}>Mr/Ms. {billData.customer.displayName}</Text>
  //             <Text style={{ fontSize: 10, marginVertical: 2 }}>Phone: {billData.customer.mobile}</Text>
  //             <Text style={{ fontSize: 10, marginVertical: 2 }}>Email: {billData.customer.email}</Text>
  //           </View>
  //           <View>
  //             <Text style={[styles.invoiceDetails, { fontSize: 14, fontWeight: 'bold' }]}>Invoice No. INV-{billData.invoiceNumber}</Text>
  //             <Text style={[styles.invoiceDetails]}>Date: {new Date(billData.invoiceDate).toLocaleDateString()}</Text>
  //           </View>
  //         </View>
  //         {/* Table */}
  //         <View style={styles.table}>
  //           <View style={styles.tableRow}>
  //             <Text style={[styles.tableColHeader, { width: '5%' }]}>#</Text>
  //             <Text style={[styles.tableColHeader, { width: '60%' }]}>Item</Text>
  //             <Text style={[styles.tableColHeader, { width: '10%' }]}>Qty</Text>
  //             <Text style={[styles.tableColHeader, { width: '10%' }]}>rate</Text>
  //             <Text style={[styles.tableColHeader, { width: '15%' }]}>Amount</Text>
  //           </View>
  //           {billData.items.map((item, idx) => (
  //             <View key={idx} style={[styles.tableRow1, { backgroundColor: idx % 2 === 0 ? '#fff' : '#bedef1' }]}>
  //               <Text style={[styles.tableColHeader2, { width: '5%' }]}>{idx + 1}</Text>
  //               <Text style={[styles.tableColHeader2, { width: '60%' }]}>{item.itemDetails}</Text>
  //               <Text style={[styles.tableColHeader2, { width: '10%' }]}>{item.quantity}</Text>
  //               <Text style={[styles.tableColHeader2, { width: '10%' }]}>{item.rate}</Text>
  //               <Text style={[styles.tableColHeader2, { width: '15%' }]}>{item.amount}</Text>
  //             </View>
  //           ))}
  //         </View>
  //         {/* Subtotal and Totals */}
  //         <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  //           <Text style={{ fontSize: 10 }}>Thanks for your buisness</Text>
  //           <View style={styles.subtotalHeadRow}>
  //             <View style={styles.subtotalRow}>
  //               <Text style={{ fontSize: 10 }}>Sub Total</Text>
  //               <Text style={{ fontSize: 10 }}>{billData.subTotal}</Text>
  //             </View>
  //             <View style={styles.subtotalRow}>
  //               <Text style={{ fontSize: 10 }}>Shipping Charge </Text>
  //               <Text style={{ fontSize: 10 }}>₹{order.shippingcharge.toFixed(2)}</Text>
  //             </View>
  //             <View style={styles.subtotalRow}>
  //               <Text style={{ fontSize: 10 }}>Tax (5%)</Text>
  //               <Text style={{ fontSize: 10 }}>₹{order.tax.toFixed(2)}</Text>
  //             </View>
  //             <View style={styles.subtotalRow1}>
  //               <Text style={{ fontSize: 15, color: '#fff' }}>Grand Total</Text>
  //               <Text style={{ fontSize: 15, color: '#fff' }}>Rs. {billData.total.toFixed(2)}</Text>
  //             </View>
  //           </View>
  //         </View>
  //         {/* Footer */}
  //         <View style={styles.footer}>
  //           <View style={styles.footerInner}>
  //             <View style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-end', marginTop: 20 }}>
  //               <Text style={styles.bold}>Authorized Signature</Text>
  //               <View style={{ height: 1, width: 120, backgroundColor: '#000' }}></View>
  //             </View>
  //           </View>
  //         </View>
  //       </Page>
  //     </Document>
  //   );
  // };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-900">Order #{order.orderId}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
              order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {order.status}
            </span>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-700 border-b">
            {error}
          </div>
        )}

        <div className="p-6">
          {/* Order Progress */}
          <div className="mb-8">
            <div className="flex justify-between relative">
              {['Pending', 'Processing', 'Shipped', 'Delivered'].map((step, index) => (
                <div key={step} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    getStatusStep(order.status) >= index ? 'bg-[#e098b0] text-white' : 'bg-gray-200'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-sm mt-2 text-gray-600">{step}</span>
                </div>
              ))}
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
            </div>
          </div>

          {/* Order Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-lg font-medium text-gray-900 mb-3">Order Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date</span>
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span>{order.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method</span>
                  <span>{order.paymentMethod}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-lg font-medium text-gray-900 mb-3">Shipping Information</h4>
              <div className="text-gray-600">
                {order.shippingAddress?.street}<br />
                {order.shippingAddress?.city}, {order.shippingAddress?.state}<br />
                {order.shippingAddress?.pincode}<br />
                Phone: {order.user?.phoneNumber}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-lg font-medium text-gray-900 mb-3">Order Items</h4>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">{item.product.name}</span>
                    <span className="text-gray-600 ml-2">x {item.quantity}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-600">₹{item.price.toFixed(2)} each</div>
                    <div className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                </div>
              ))}
              <div className="border-t pt-4 flex justify-between font-semibold">
                <span>Total Amount</span>
                <span>₹{order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t flex justify-end space-x-4">
          {order.status === 'Pending' && (
            <button
              onClick={() => setCancelDialog(true)}
              disabled={cancelling}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center"
            >
              <FiX className="mr-2" />
              {cancelling ? 'Cancelling...' : 'Cancel Order'}
            </button>
          )}
          {/* Download Invoice Button */}
          {/* <PDFDownloadLink
            document={<Invoice order={order} />}
            fileName={`Invoice_${order.orderId || order.id}.pdf`}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {({ loading }) => (loading ? 'Preparing Invoice...' : 'Download Invoice')}
          </PDFDownloadLink> */}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>

      {/* Cancel Confirmation Dialog */}
      {cancelDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Cancel Order</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel this order? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setCancelDialog(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                No, Keep Order
              </button>
              <button
                onClick={handleCancelOrder}
                disabled={cancelling}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                {cancelling ? 'Cancelling...' : 'Yes, Cancel Order'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MyOrders = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancellingOrderId, setCancellingOrderId] = useState(null);
  const [cancelDialog, setCancelDialog] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await userService.getOrders();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = (orderId) => {
    console.log('====================================');
    console.log(orderId);
    console.log('====================================');
    setCancellingOrderId(orderId);
    setCancelDialog(true);
  };

  const handleCancelConfirm = async () => {
    try {
      await userService.cancelOrder(cancellingOrderId);
      await loadOrders();
      setCancelDialog(false);
      setCancellingOrderId(null);
    } catch (err) {
      setError(err.message || 'Failed to cancel order');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#e098b0]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
        {error}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No orders found</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Order #{order.orderId}</h3>
                <p className="text-sm text-gray-500">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="mt-2 sm:mt-0 flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
                {order.status === 'Pending' && (
                  <button
                    onClick={() => handleCancelClick(order._id)}
                    className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center"
                  >
                    <FiX className="mr-1" />
                    Cancel Order
                  </button>
                )}
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="p-1 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded-md"
                >
                  <FiEye className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.product.name} x {item.quantity}</span>
                    <span>₹{item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <OrderDetail
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onCancel={loadOrders}
        />
      )}

      {/* Cancel Confirmation Dialog */}
      {cancelDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Cancel Order</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel this order? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setCancelDialog(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                No, Keep Order
              </button>
              <button
                onClick={handleCancelConfirm}
                disabled={loading}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                {loading ? 'Cancelling...' : 'Yes, Cancel Order'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders; 