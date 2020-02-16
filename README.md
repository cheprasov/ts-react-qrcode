[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

@cheprasov/react-qrcode (v1.0.1)
=========

The library is for generating QR codes. The library is React wrapper for library @cheprasov/qrcode

#### Features:
- it is easy to use and configure (error correction level, type number, padding and so on).
- Supports inverting of data.
- Support image/logo on QR-code.
- The library is covered by tests.
- The library has typescript definitions.

- QRCodeImg
    - Render QR-code like dataUrl: `<img src="data:image/png;base64,..." alt="..." />`
    - Supports adding a image (logo) to QR code (allows to use url, dataUrl, Image, Canvas).
    - It is possible to specify scale or blocks size.
    - Allows to specify relative/abcolute position/size of image on QR code.

### 1. How to install

```bash
> npm install @cheprasov/react-qrcode
```

```javascript
import { QRCodeImg } from '@cheprasov/react-qrcode';
```

### 2. Quick examples

#### 2.1. Create SVG QR Code
```javascript
import { QRCodeImg } from '@cheprasov/react-qrcode';

//...
    return (
        <QRCodeImg value="https://github.com/cheprasov/ts-react-qrcode" />
    );
//...

```

#### 2.2. Create Image QR Code
```javascript
import { QRCodeImg } from '@cheprasov/react-qrcode';

    return (
        <QRCodeImg
            value="https://github.com/cheprasov/ts-react-qrcode"
            image={{
                source: 'GitHub-Mark-120px-plus.png',
                width: '20%',
                height: '20%',
                x: 'center',
                y: 'center',
            }}
        />
    );
```

Result:

Note, padding & image.border = 1 by default.

![test](https://raw.githubusercontent.com/cheprasov/js-qrcode/master/qrcode_scheme.png)

### 3. Documentation

#### 3.1. class `QRCodeImg`

The class for creating img element with QR-code as dataUrl.

```javascript
import { QRCodeImg } from '@cheprasov/react-qrcode';
```

Props:
- `value` (string) - new value for encoding to QR code.
- `alt` (string, optional) - alt text for img element.
- `level` (string, optional, default = `L`) - error correction level. Note, the level affects QR Code data size. Allowed values:
    - `L` - Allows recovery of up to 7% data loss
    - `M` - Allows recovery of up to 15% data loss
    - `Q` - Allows recovery of up to 25% data loss
    - `H` - Allows recovery of up to 30% data loss

- `invert` (boolean, optional, default = `false`) - inverting data of QR code.
- `padding` (number, optional, default = `1`) - count of white spaces on sides QR code. 1 unit has size like 1 information dot.
- `fgColor` (string, optional, default = `#000`) - foreground color of the QR code, is it allowed to use the next formats:
    - `RGB` or `#RGB`, example: `#ABC`, will be converted to `#AABBCC`
    - `RGBA` or `#RGBA`, example: `#ABCD`, will be converted to `#AABBCCDD`
    - `RRGGBB` or `#RRGGBB`, example: `#AABBCC`
    - `RRGGBBAA` or `#RRGGBBAA`, example: `#AABBCCDD`
    - Other formats (like `red`, `rgb(...)`, `rgba(...)`) are not supported and will be converted to `#0000`
- `bgColor` (string, optional, default = `#FFF`) - background color of the QR code, see description of `fgColor`.
- `scale` (number, optional, default = `10`) - scale size of QR code. For example, when scale is 5 then QR generator will use 5 pixel for draw 1 data dot.
- `size` (number, optional, default = `null`) - size (width & height) of canvas in pixels. If size is specified then scale param will be ignored. Note, that the original canvas with QR code will be stretched to the specified size. See [image scheme](#23-qr-code-with-image)
- `image` (object, optional, default = `null`) - parameters on an image, that should be added to QR code, like logo.
    - `source` (string|Image|Canvas) - source of image for QR Code, allowed to use the next types:
        - `string` - url to resource or dataUrl of image.
        - `Image` - it is allowed to use Image. The image's src should be loaded before use it.
        - `Canvas` - allowed to use HTML5 canvas element.
    - `width` (number|string) - width of the image in QR code dots (not a pixel), allowed formats:
        - `<number>` - defines the width of image, example: `width: 30`
        - `<number>%` - defines the width in percent of QR code without padding, example: `width: '20%'`
    - `height` (number|string) - height of the image in QR code dots, see `width`
    - `x` (number|string, optional, default = `0`) - position of image on QR code by horizontal in QR code dots (not a pixel), allowed formats:
        - `<number>` - sets the left edge position from left to right, example: `x: 10`
        - `<number>%` - sets the left edge position in % of QR code without padding. Negative values are allowed. Example: `x: '50%'`
        - `left` -  aligns the image to the left, example: `x: 'left'`
        - `right` -  aligns the image to the right, example: `x: 'right'`
        - `center` - Centers the image in center of QR code,  example: `x: 'center'`
        - `left <number>` - the same as `<number>`
        - `left <number>%` - the same as `<number>%`
        - `right <number>` - sets the right edge position from right to left, example: `x: 'right 5'`
        - `right <number>%` - sets the tight edge position in % of QR code without padding, example: `x: 'right 10%'`
    - `y` (number|string, optional, default = `0`) - position of image on QR code by vertical in QR code dots (not a pixel), allowed formats:
        - `<number>` - sets the top edge position from top to bottom, example: `y: 10`
        - `<number>%` - sets the top edge position in % of QR code without padding. Negative values are allowed. Example: `y: '50%'`
        - `top` -  aligns the image to the top, example: `y: 'top'`
        - `bottom` -  aligns the image to the bottom, example: `y: 'bottom'`
        - `center` - Centers the image in center of QR code,  example: `y: 'center'`
        - `top <number>` - the same as `<number>`
        - `top <number>%` - the same as `<number>%`
        - `bottom <number>` - sets the bottom edge position from bottom to top, example: `y: 'bottom 5'`
        - `bottom <number>%` - sets the bottom edge position in % of QR code without padding, example: `y: 'bottom 10%'`
    - `border` (number, optional, default = 1) - white space length around the images in dots. Negative values are allowed.
        - use `0` - for white space only under the image
        - use `null` to remove any white spaces under image and leave QR data dots
Example
```javascript
import { QRCodeImg } from '@cheprasov/react-qrcode';
    // ...
    return (
        <QRCodeImg
            value="foo"
            bgColor="#f00"
            fgColor="#AAA"
            invert={true}
            level="Q"
            padding={2}
            scale={42}
            size={100}
            image={{
                source: 'some.png',
                width: '10%',
                height: '10%',
            }}
        />
    );
    // ...
```

## Something does not work

Feel free to fork project, fix bugs, write tests and finally request for pull
