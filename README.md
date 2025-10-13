# E-commerce Mobile App

A feature-rich React Native mobile application for e-commerce, built with Expo and modern development practices.

## 🚀 Features

### Core Features
- **Authentication**: Login, register, forgot password with JWT
- **Product Catalog**: Browse, search, and filter products
- **Shopping Cart**: Add/remove items with persistent storage
- **Checkout**: Secure payment processing with Stripe
- **Order Management**: Track orders and view history
- **User Profile**: Manage account and addresses
- **Push Notifications**: Order updates and promotions

### Technical Features
- **TypeScript**: Full type safety
- **Redux Toolkit**: Predictable state management
- **React Query**: Server state management and caching
- **Offline Support**: Cached data and offline cart
- **Responsive Design**: Optimized for all screen sizes
- **Accessibility**: Screen reader support and proper contrast

## 🛠 Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **React Navigation** for navigation
- **Redux Toolkit** for state management
- **React Query** for server state
- **AsyncStorage** for persistence
- **Expo Vector Icons** for icons
- **React Native Toast Message** for notifications

## 📁 Project Structure

```
mobile/
├── src/
│   ├── screens/          # App screens
│   │   ├── auth/        # Authentication screens
│   │   └── main/        # Main app screens
│   ├── navigation/       # Navigation configuration
│   ├── store/           # Redux store and slices
│   │   ├── slices/      # Redux slices
│   │   └── types.ts     # TypeScript types
│   ├── components/      # Reusable components
│   ├── services/        # API services
│   ├── utils/           # Utility functions
│   └── constants/       # App constants
├── assets/              # Images and fonts
├── app.json            # Expo configuration
└── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (Mac) or Android Studio
- Backend API running (see backend README)

### Installation

1. **Install dependencies**
   ```bash
   cd mobile
   npm install
   ```

2. **Configure API endpoint**
   ```typescript
   // Update API_BASE_URL in src/services/api.ts
   const API_BASE_URL = 'http://localhost:4000/api';
   ```

3. **Start development server**
   ```bash
   npx expo start
   ```

4. **Run on device/simulator**
   - **iOS**: Press `i` or scan QR code with Camera app
   - **Android**: Press `a` or scan QR code with Expo Go app
   - **Web**: Press `w` for web development

## 🔧 Available Scripts

```bash
# Development
npm start                 # Start Expo development server
npm run android          # Start Android development
npm run ios              # Start iOS development
npm run web              # Start web development

# Building
npm run build:android    # Build Android APK
npm run build:ios        # Build iOS app

# Testing
npm test                 # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run format           # Format code with Prettier
npm run type-check       # Run TypeScript type checking
```

## 📱 App Screens

### Authentication Flow
- **Login**: Email/password authentication
- **Register**: Create new account
- **Forgot Password**: Password reset flow

### Main App
- **Home**: Featured products, categories, quick actions
- **Search**: Product search with filters
- **Cart**: Shopping cart with quantity management
- **Orders**: Order history and tracking
- **Profile**: User account management

## 🏗 State Management

### Redux Store Structure
```typescript
{
  auth: {
    isAuthenticated: boolean;
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    loading: boolean;
    error: string | null;
  },
  cart: {
    items: CartItem[];
    total: number;
    loading: boolean;
    error: string | null;
  },
  user: {
    profile: User | null;
    addresses: Address[];
    loading: boolean;
    error: string | null;
  }
}
```

### React Query
- Automatic caching and background updates
- Optimistic updates for cart operations
- Offline support with stale-while-revalidate

## 🔐 Authentication

### Authentication Flow
1. **Login/Register**: Store tokens in Redux and AsyncStorage
2. **Token Refresh**: Automatic refresh before expiration
3. **Logout**: Clear tokens and redirect to login
4. **Persistent Login**: Restore session on app launch

### Security Features
- JWT token storage in secure AsyncStorage
- Automatic token refresh
- Secure API communication
- Input validation and sanitization

## 🛒 Shopping Cart

### Features
- Add/remove products
- Quantity management
- Persistent storage (survives app restarts)
- Real-time total calculation
- Guest cart support

### State Management
- Redux for cart state
- AsyncStorage for persistence
- Optimistic updates for better UX

## 💳 Payment Integration

### Stripe Integration
- Secure payment processing
- Support for multiple payment methods
- Real-time payment status updates
- Error handling and user feedback

### Checkout Flow
1. **Cart Review**: Review items and quantities
2. **Address Selection**: Choose shipping address
3. **Payment**: Secure payment with Stripe
4. **Confirmation**: Order confirmation and tracking

## 📱 Navigation

### Navigation Structure
```
AppNavigator
├── AuthNavigator (when not authenticated)
│   ├── Login
│   ├── Register
│   └── ForgotPassword
└── MainNavigator (when authenticated)
    ├── Home
    ├── Search
    ├── Cart
    ├── Orders
    └── Profile
```

### Navigation Features
- Bottom tab navigation for main app
- Stack navigation for auth flow
- Deep linking support
- Navigation state persistence

## 🎨 UI/UX Design

### Design System
- **Colors**: Primary blue (#007AFF), secondary grays
- **Typography**: System fonts with proper hierarchy
- **Spacing**: Consistent 8px grid system
- **Components**: Reusable, accessible components

### Accessibility
- Screen reader support
- Proper contrast ratios
- Touch target sizes (44px minimum)
- Semantic markup

## 📊 Performance

### Optimization Strategies
- **Image Optimization**: Lazy loading and caching
- **List Performance**: FlatList with proper keyExtractor
- **Bundle Size**: Code splitting and tree shaking
- **Memory Management**: Proper cleanup and memoization

### Monitoring
- Performance monitoring with Flipper
- Crash reporting setup
- Analytics integration ready

## 🧪 Testing

### Test Setup
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure
- **Unit Tests**: Individual components and functions
- **Integration Tests**: Screen interactions
- **E2E Tests**: Complete user flows (optional)

### Testing Libraries
- **Jest**: Test runner and assertions
- **React Native Testing Library**: Component testing
- **Mock Service Worker**: API mocking

## 🐛 Debugging

### Development Tools
- **Expo DevTools**: Built-in debugging tools
- **React DevTools**: Component inspection
- **Redux DevTools**: State management debugging
- **Flipper**: Advanced debugging and profiling

### Common Issues
1. **Metro bundler cache**: Clear with `npx expo start --clear`
2. **Node modules**: Delete and reinstall if issues persist
3. **iOS simulator**: Reset simulator if build fails

## 📱 Platform-Specific Features

### iOS
- Native iOS navigation patterns
- iOS-specific UI components
- Push notifications via APNs
- App Store deployment ready

### Android
- Material Design components
- Android-specific navigation
- Push notifications via FCM
- Google Play Store deployment ready

## 🚀 Building for Production

### Android Build
```bash
# Build APK
npx expo build:android

# Build AAB (recommended for Play Store)
npx expo build:android --type app-bundle
```

### iOS Build
```bash
# Build for iOS
npx expo build:ios

# Build for TestFlight
npx expo build:ios --type archive
```

### Environment Configuration
```typescript
// Update API endpoints for production
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:4000/api'
  : 'https://your-api-domain.com/api';
```

## 📦 App Store Deployment

### Pre-deployment Checklist
- [ ] Update app version in `app.json`
- [ ] Configure production API endpoints
- [ ] Test on real devices
- [ ] Generate app icons and splash screens
- [ ] Prepare app store screenshots
- [ ] Write app store description

### App Store Connect
1. Create app in App Store Connect
2. Upload build via Xcode or EAS Build
3. Configure app metadata
4. Submit for review

### Google Play Console
1. Create app in Google Play Console
2. Upload AAB file
3. Configure store listing
4. Submit for review

## 🔧 Configuration

### Expo Configuration (`app.json`)
```json
{
  "expo": {
    "name": "E-commerce Mobile",
    "slug": "ecommerce-mobile",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "bundleIdentifier": "com.ecommerce.mobile"
    },
    "android": {
      "package": "com.ecommerce.mobile"
    }
  }
}
```

### Environment Variables
```typescript
// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost:4000/api',
  TIMEOUT: 10000,
};

// App Configuration
export const APP_CONFIG = {
  NAME: 'E-commerce Mobile',
  VERSION: '1.0.0',
  SUPPORT_EMAIL: 'support@ecommerce.com',
};
```

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Make changes and test thoroughly
4. Commit changes: `git commit -m 'Add amazing feature'`
5. Push to branch: `git push origin feature/amazing-feature`
6. Open Pull Request

### Code Standards
- Use TypeScript for all new code
- Follow existing component patterns
- Write tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using React Native, Expo, and TypeScript**
"# mok-mobile-app" 
