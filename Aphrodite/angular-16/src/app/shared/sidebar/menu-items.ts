import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'The Team',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/bi/overview',
    title: 'Overview Dashboard',
    icon: 'bi bi-bar-chart',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/bi/sales',
    title: 'Sales Dashboard',
    icon: 'bi bi-graph-up-arrow',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/bi/sales2',
    title: 'Sales 2 Dashboard',
    icon: 'bi bi-graph-up',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/bi/stock',
    title: 'Stock Dashboard',
    icon: 'bi bi-boxes',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/bi/production',
    title: 'Production Dashboard',
    icon: 'bi bi-gear',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/bi/clustering',
    title: 'Clustering',
    icon: 'bi bi-diagram-3',
    class: '',
    extralink: false,
    submenu: []
  },
  // {
  //   path: '/bi/timeseries',
  //   title: 'BI Time Series',
  //   icon: 'bi bi-calendar-range',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },

  // ➕ STOCK MANAGEMENT
  {
    path: '',
    title: 'Stock Management',
    icon: 'bi bi-box',
    class: '',
    extralink: false,
    submenu: [
      { path: '/ml/classification-visual', title: 'Classification Stock', icon: '', class: '', extralink: false, submenu: [] },
      { path: '/ml/clustering-stock', title: 'Clustering Stock', icon: '', class: '', extralink: false, submenu: [] },
      { path: '/ml/regression-visual', title: 'Régression Stock', icon: '', class: '', extralink: false, submenu: [] },
      { path: '/ml/recommendation-visual', title: 'Recommandation Stock', icon: '', class: '', extralink: false, submenu: [] },
      { path: '/ml/box-classifier', title: 'Box Classifier', icon: '', class: '', extralink: false, submenu: [] }
    ]
  },

  // ➕ PRODUCTION MANAGEMENT
  {
    path: '',
    title: 'Production Management',
    icon: 'bi bi-gear-wide-connected',
    class: '',
    extralink: false,
    submenu: [
      { path: '/classification-production', title: 'Classification Prod.', icon: '', class: '', extralink: false, submenu: [] },
      { path: '/regression-production', title: 'Régression Prod.', icon: '', class: '', extralink: false, submenu: [] },
      { path: '/ml/forecast-visual', title: 'Prévision Production', icon: '', class: '', extralink: false, submenu: [] },
      { path: '/ml/cosmetics-visual', title: '🧴 Cosmétiques (CNN)', icon: '', class: '', extralink: false, submenu: [] },
      { path: '/ml/recommendation-production', title: '🎯 Recommandation Prod.', icon: '', class: '', extralink: false, submenu: [] }
    ]
  },

  // ➕ SALES MANAGEMENT
  {
    path: '',
    title: 'Sales Management',
    icon: 'bi bi-cash-coin',
    class: '',
    extralink: false,
    submenu: [
      { path: '/ml/predict-revenue', title: 'Predict Revenue', icon: '', class: '', extralink: false, submenu: [] },
      { path: '/ml/sentiment-review', title: 'Sentiment Review', icon: '', class: '', extralink: false, submenu: [] },
      { path: '/ml/arriima-visual', title: 'ARIMA Forecast', icon: '', class: '', extralink: false, submenu: [] },
      { path: '/ml/blinear-visual', title: 'Régression B-Linéaire', icon: '', class: '', extralink: false, submenu: [] }
    ]
  }
];
