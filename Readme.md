# HID DigitalPersona Fingerprint API

This JavaScript library enables the use fingerprint readers in web browsers, allowing to capture capture fingerprint enrollment or authentication data using a DigitalPersona local device access API.

> [!IMPORTANT]
> The API is designed to be used in a browser environment only! This is not a NodeJS library!

## Requirements

The Fingerprint API requires one of the following HID DigitalPersona clients to be installed on the user's machine:

* [HID DigitalPersona Workstation / Kiosk](https://www.hidglobal.com/product-mix/digitalpersona) - part of HID DigitalPersona Premium suite, providing multi-factor authentication, biometrics, integration with Microsoft® Active Directory, etc
* [HID Authentication Device Client ](https://digitalpersona.hidglobal.com/lite-client/) (ADC, previously Lite Client) - a free Microsoft Windows® client providing communication with devices such as fingerprint readers and cards

## Target platforms and technologies

Supported platforms:

* Microsoft Windows 10 and later
* Microsoft Windows Server 2008 R2 and later

Supported browsers:

* Google® Chrome®  and Chrome-based browsers (such as Microsoft Edge)
* Mozilla® Firefox®
* Microsoft Edge Legacy (WebView2)

Module formats (browser-only, no NodeJS!):

* IIFE (ES5) - `dist/fingerprint.sdk[.min].js`
* Typings (TypeScript) - `dist/fingerprint.sdk.d.ts

## Documentation

[Usage information and API description](./docs/usage/index.adoc)

[Code samples](samples)

[Information for contributors/maintainers](./docs/maintain/index.adoc)

## License

The library is licensed under the [MIT](./LICENSE) license.

Copyright (c) 2025 HID Global, Inc.

