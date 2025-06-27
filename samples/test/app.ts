/// <reference path="fingerprint.sdk.ts" />

class FingerprintSdkTest {
    element: HTMLElement;
    resultList: HTMLElement;
    sdk: Fingerprint.WebApi;
    acquisitionStarted: boolean;

    constructor(element: HTMLElement) {
        var _instance = this;

        this.acquisitionStarted = false;
        this.sdk = new Fingerprint.WebApi;
        this.sdk.onCommunicationFailed = (e) => {
            _instance.acquisitionStarted = false;
        };
        this.sdk.onSamplesAcquired = (s) => {
            var samples = JSON.parse(s.samples);
            var image = <HTMLImageElement>document.createElement("img");
            image.src = "data:image/png;base64," + window.btoa(Fingerprint.b64UrlToUtf8(samples[0]));
            _instance.resultList.appendChild(image);
        };

        this.element = element;

        var btnEnum = document.createElement("button");
        var btnEnumText = document.createTextNode("Enumerate Readers");
        btnEnum.appendChild(btnEnumText);
        btnEnum.onclick = (e) => { _instance.stopCapture(); _instance.startEnumeration(); };
        this.element.appendChild(btnEnum);

        var btnCapture = document.createElement("button");
        var btnCaptureText = document.createTextNode("Start Capture");
        btnCapture.appendChild(btnCaptureText);
        btnCapture.onclick = (e) => { _instance.startCapture(); };
        this.element.appendChild(btnCapture);

        var btnStop = document.createElement("button");
        var btnStopText = document.createTextNode("Stop Capture");
        btnStop.appendChild(btnStopText);
        btnStop.onclick = (e) => { _instance.stopCapture(); };
        this.element.appendChild(btnStop);

        this.resultList = document.createElement("div");
        this.element.appendChild(this.resultList);
    }

    startEnumeration() {
        var _instance = this;
        this.resultList.innerHTML = '';
        this.sdk.enumerateDevices().then(devices => {
            var list = document.createElement("div");
            _instance.resultList.appendChild(list);
            var txt = "Count = " + devices.length.toString();
            list.innerText = txt;
            if (devices.length > 0) {
                _instance.sdk.getDeviceInfo(devices[0]).then(deviceInfo => {
                    var list = document.createElement("div");
                    _instance.resultList.appendChild(list);
                    list.innerText = deviceInfo.DeviceID + ": UidType = " + Fingerprint.DeviceUidType[deviceInfo.eUidType] + ", Modality = " + Fingerprint.DeviceModality[deviceInfo.eDeviceModality] + (deviceInfo.eDeviceTech ? (", Technology = " + Fingerprint.DeviceTechnology[deviceInfo.eDeviceTech]) : "");
                }, error => {
                    var list = document.createElement("div");
                    _instance.resultList.appendChild(list);
                    list.innerText = error.message;
                });
            }
        }, error => {
            var list = document.createElement("div");
            _instance.resultList.appendChild(list);
            list.innerText = error.message;
        });
    }

    startCapture() {
        if (this.acquisitionStarted) return;
        var _instance = this;
        this.resultList.innerHTML = '';
        this.sdk.startAcquisition(Fingerprint.SampleFormat.PngImage).then(() => {
            _instance.acquisitionStarted = true;
            var list = document.createElement("div");
            _instance.resultList.appendChild(list);
            list.innerText = "Scan your finger.";
        }, (error) => {
            var list = document.createElement("div");
            _instance.resultList.appendChild(list);
            list.innerText = error.message;
        });
    }

    stopCapture() {
        if (!this.acquisitionStarted) return;
        var _instance = this;
        this.sdk.stopAcquisition().then(() => {
            _instance.acquisitionStarted = false;
            _instance.resultList.innerHTML = '';
        }, (error) => {
            var list = document.createElement("div");
            _instance.resultList.appendChild(list);
            list.innerText = error.message;
        });
    }
}

window.onload = () => {
    var el = document.getElementById('content');
    var test = new FingerprintSdkTest(el);
};