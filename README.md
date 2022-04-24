# Overview

[![npm][npm]][npm-url]
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

Blauhub cookie aims to be a modern DSGVO and TTDSG conform cookie banner. It is inspired by [Cookie Consent](https://github.com/orestbida/cookieconsent#layout-options--customization).

## Highlights

- Minimal code size: 5kb minified and gzipped
- Customizeable
- SSR compatible and hooks
- Accessible

## Installation

```bash
npm install blauhub-cookie
```

## Usage

### Basic Usage

```js
import { CookieConsent, Expander } from "blauhub-cookie";
import "blauhub-cookie/dist/bhcookie.min.css";

function Component() {
  return (
    <CookieConsent
      onAcceptSelection={(permissions) => console.log(permissions)}
    >
      <p>Details of cookie settings can be viewed here</p>

      <Expander id="functional" title="Text 1" isRequired>
        <p>Detail Info</p>
      </Expander>
    </CookieConsent>
  );
}
```

[Demo](./demo/simple/index.tsx)

## Disclaimer

This publication is provided as is without any express or implied warranties. While every effort has been taken to ensure the accuracy of the information contained in this publication, the authors/maintainers/contributors assume no responsibility for errors or omissions, or for damages resulting from the use of the information contained herein.

## License

[MIT](./LICENSE)

[npm]: https://img.shields.io/npm/v/blauhub-cookie.svg
[npm-url]: https://npmjs.com/package/blauhub-cookie
