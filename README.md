# broccoli-vendor

## Installation

```
npm install --save-dev broccoli-vendor
```

## Usage

```js
var findVendorTrees = require('broccoli-vendor');

// Assuming we have an app that uses bower for managing dependencies in `vendor` and we also have  non-bower dependencies that we would also like to store inside of the `vendor` directory
var customVendorTrees = findVendorTrees('vendor/manual_dependencies');
```

Then pass `customVendorTrees` into other plugins to have the files in your manual vendor
directory picked up by them.
