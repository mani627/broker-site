export const sellerTasksData = [

  {
    title: "orders",
    data: "12 Order Placed"
  },
  {
    title: "daily_sales",
    data: "30+ sales"
  },
  {
    title: "task_complete",
    data: "20 tasks are bending"
  }

]

export const AdminTaskData = [

  {
    title: "members_count",
    data: "12 + members"
  },
  {
    title: "active_inactive_users",
    data: {
      active: "100",
      inactive: "20"
    }
  },
  {
    title: "low_balance",
    data: "20 Low Balance"
  },


]

export const SellerTableData =
  [
    {
      waybill: "11150810272145",
      createdDate: "2024-12-17T20:42:22.321",
      pickupAddress: "Bangalore_Hosapalaya_C (Karnataka)",
      deliveryAddress: "Pune",
      paymentMode: "Prepaid",
      status: "Pending"
    },
    {
      waybill: "11150810272145",
      createdDate: "2024-12-17T20:42:22.321",
      pickupAddress: "Bangalore_Hosapalaya_C (Karnataka)",
      deliveryAddress: "Pune",
      paymentMode: "Prepaid",
      status: "Pending"
    },
    {
      waybill: "11150810272145",
      createdDate: "2024-12-17T20:42:22.321",
      pickupAddress: "Bangalore_Hosapalaya_C (Karnataka)",
      deliveryAddress: "Pune",
      paymentMode: "Prepaid",
      status: "Pending"
    },
    {
      waybill: "11150810272031",
      createdDate: "2024-12-16T17:03:08",
      pickupAddress: "Bangalore_Hosapalaya_C (Karnataka)",
      deliveryAddress: "Kataula",
      paymentMode: "Prepaid",
      status: "Returned"
    },
    {
      waybill: "11150810272190",
      createdDate: "2024-12-17T19:00:00",
      pickupAddress: "Coimbatore_IndiraGarden_D (Tamil Nadu)",
      deliveryAddress: "Mumbai",
      paymentMode: "COD",
      status: "Delivered"
    },
    {
      waybill: "11150810272199",
      createdDate: "2024-12-18T08:15:22",
      pickupAddress: "Delhi_CP_D (Delhi)",
      deliveryAddress: "Jaipur",
      paymentMode: "COD",
      status: "Pickup Scheduled"
    }
  ];



export const AdmintableData = [
  {
    orderId: "Seller001",
    sellerName: "Ramesh",
    createDate: "2024-12-12T10:30:00",
    Wallet_Amount: 450,
    Subscription_Plan: "Gold Plan",
    Action_Status: "active",
  },
  {
    orderId: "Seller002",
    sellerName: "Suresh",
    createDate: "2024-12-11T15:45:00",
    Wallet_Amount: 600,
    Subscription_Plan: "Platinum Plan",
    Action_Status: "deactive",
  },
  {
    orderId: "Seller003",
    sellerName: "Mahesh",
    createDate: "2024-12-10T12:00:00",
    Wallet_Amount: 300,
    Subscription_Plan: "Silver Plan",
    Action_Status: "active",
  },
  {
    orderId: "Seller004",
    sellerName: "Ganesh",
    createDate: "2024-12-09T09:15:00",
    Wallet_Amount: 700,
    Subscription_Plan: null,
    Action_Status: "deactive",
  },
  {
    orderId: "Seller005",
    sellerName: "Rajesh",
    createDate: "2024-12-08T14:20:00",
    Wallet_Amount: 150,
    Subscription_Plan: "Basic Plan",
    Action_Status: "active",
  },
  {
    orderId: "Seller006",
    sellerName: "Lokesh",
    createDate: "2024-12-07T17:30:00",
    Wallet_Amount: 850,
    Subscription_Plan: "Premium Plan",
    Action_Status: "deactive",
  },
];


export const OrderId =  {
  "success": true,
  "data": {
    "shipmentDetails": {
      "waybillNo": "11150810272366",
      "orderDate": "2024-12-12T15:45:30.000Z",
      "package_details": {
        "products_desc": "Electronics",
        "total_amount": 1200,
        "quantity": 2
      },
      "delivery_details": {
        "delivery_address": {
          "name": "John Doe",
          "address": "123 Main St",
          "city": "New York",
          "state": "NY",
          "pin": "10001",
          "country": "USA"
        },
        "pickup_address": {
          "location": "Warehouse A",
          "origin": "Los Angeles, CA"
        }
      },
      "payment_mode": "Credit Card",
      "total_amount": 1200,
      "subtotal_price": 1000,
      "weight": 2.5,
      "order": "Order12345"
    },
    "statusArray": [
      { "Ready To Ship": true, "date": "2024-12-12T14:09:57.623" },
      { "Scheduled for Pickup": true, "date": "" },
      { "In Transit": true, "date": "" },
      { "Out of Delivery": true, "date": "2024-12-17T11:24:07.437" },
      { "Delivered": true, "date": "2024-12-17T20:26:50.002" }
    ]
  }
}



export const OTP = ['111111','121212']