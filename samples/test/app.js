var FingerprintSdkTest = (function () {
    function FingerprintSdkTest(element) {
        var _instance = this;
        this.acquisitionStarted = false;
        this.sdk = new Fingerprint.WebApi;
        this.sdk.onCommunicationFailed = function (e) {
            _instance.acquisitionStarted = false;
        };
        this.sdk.onSamplesAcquired = function (s) {
            var samples = JSON.parse(s.samples);
            var image = document.createElement("img");
            image.src = "data:image/png;base64," + window.btoa(Fingerprint.b64UrlToUtf8(samples[0]));
            _instance.resultList.appendChild(image);
        };
        this.element = element;
        var btnEnum = document.createElement("button");
        var btnEnumText = document.createTextNode("Enumerate Readers");
        btnEnum.appendChild(btnEnumText);
        btnEnum.onclick = function (e) { _instance.stopCapture(); _instance.startEnumeration(); };
        this.element.appendChild(btnEnum);
        var btnCapture = document.createElement("button");
        var btnCaptureText = document.createTextNode("Start Capture");
        btnCapture.appendChild(btnCaptureText);
        btnCapture.onclick = function (e) { _instance.startCapture(); };
        this.element.appendChild(btnCapture);
        var btnStop = document.createElement("button");
        var btnStopText = document.createTextNode("Stop Capture");
        btnStop.appendChild(btnStopText);
        btnStop.onclick = function (e) { _instance.stopCapture(); };
        this.element.appendChild(btnStop);
        this.resultList = document.createElement("div");
        this.element.appendChild(this.resultList);
    }
    FingerprintSdkTest.prototype.startEnumeration = function () {
        var _instance = this;
        this.resultList.innerHTML = '';
        this.sdk.enumerateDevices().then(function (devices) {
            var list = document.createElement("div");
            _instance.resultList.appendChild(list);
            var txt = "Count = " + devices.length.toString();
            list.innerText = txt;
            if (devices.length > 0) {
                _instance.sdk.getDeviceInfo(devices[0]).then(function (deviceInfo) {
                    var list = document.createElement("div");
                    _instance.resultList.appendChild(list);
                    list.innerText = deviceInfo.DeviceID + ": UidType = " + Fingerprint.DeviceUidType[deviceInfo.eUidType] + ", Modality = " + Fingerprint.DeviceModality[deviceInfo.eDeviceModality] + (deviceInfo.eDeviceTech ? (", Technology = " + Fingerprint.DeviceTechnology[deviceInfo.eDeviceTech]) : "");
                }, function (error) {
                    var list = document.createElement("div");
                    _instance.resultList.appendChild(list);
                    list.innerText = error.message;
                });
            }
        }, function (error) {
            var list = document.createElement("div");
            _instance.resultList.appendChild(list);
            list.innerText = error.message;
        });
    };
    FingerprintSdkTest.prototype.startCapture = function () {
        if (this.acquisitionStarted)
            return;
        var _instance = this;
        this.resultList.innerHTML = '';
        this.sdk.startAcquisition(Fingerprint.SampleFormat.PngImage).then(function () {
            _instance.acquisitionStarted = true;
            var list = document.createElement("div");
            _instance.resultList.appendChild(list);
            list.innerText = "Scan your finger.";
        }, function (error) {
            var list = document.createElement("div");
            _instance.resultList.appendChild(list);
            list.innerText = error.message;
        });
    };
    FingerprintSdkTest.prototype.stopCapture = function () {
        if (!this.acquisitionStarted)
            return;
        var _instance = this;
        this.sdk.stopAcquisition().then(function () {
            _instance.acquisitionStarted = false;
            _instance.resultList.innerHTML = '';
        }, function (error) {
            var list = document.createElement("div");
            _instance.resultList.appendChild(list);
            list.innerText = error.message;
        });
    };
    return FingerprintSdkTest;
}());
window.onload = function () {
    var el = document.getElementById('content');
    var test = new FingerprintSdkTest(el);
};
