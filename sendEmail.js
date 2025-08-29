"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = require("nodemailer");
// sendTestEmail.ts
// ✨ 1. Mailtrap SMTP 설정 (또는 네가 쓸 SMTP 설정)
var transporter = nodemailer_1.default.createTransport({
    host: "smtp.mailtrap.io", // Mailtrap 호스트
    port: 587,
    auth: {
        user: "746ae953442fd4", // 👉 네 Mailtrap 계정 user
        pass: "0b3a3620d5ec84", // 👉 네 Mailtrap 계정 password
    },
});
// ✨ 2. 너가 만든 HTML 템플릿
var htmlTemplate = "\n<!DOCTYPE html>\n<html lang=\"ko\">\n<head><meta charset=\"UTF-8\"></head>\n<body>\n  <table>\n    <tr><td><img src=\"https://playhive-img.s3.eu-north-1.amazonaws.com/Logo.svg\" alt=\"PlayHive\" width=\"120\" height=\"32\" /></td></tr>\n    <tr><td><h1>\uD50C\uB808\uC774\uD558\uC774\uBE0C \uD68C\uC6D0\uAC00\uC785\uC744 \uC704\uD55C \uC774\uBA54\uC77C \uC778\uC99D\uBC88\uD638</h1></td></tr>\n    <tr><td>\uC548\uB155\uD558\uC138\uC694. <strong>{email}</strong>\uB2D8,<br/>5\uBD84 \uC774\uB0B4\uB85C \uC544\uB798 \uC778\uC99D\uBC88\uD638\uB97C \uC785\uB825\uD558\uC5EC \uC774\uBA54\uC77C \uC8FC\uC18C \uC778\uC99D\uC744 \uC644\uB8CC\uD558\uC138\uC694.</td></tr>\n    <tr><td style=\"background: #f8fdff; font-size: 42px; color: #00adee; font-weight: 900; text-align: center;\">{code}</td></tr>\n    <tr><td style=\"padding-top: 24px;\">\uBCF8 \uBA54\uC77C\uC740 \uBC1C\uC2E0\uC804\uC6A9\uC785\uB2C8\uB2E4. <a href=\"https://playhive.co.kr/customer\">\uACE0\uAC1D\uC13C\uD130</a>\uB97C \uC774\uC6A9\uD558\uC138\uC694.</td></tr>\n  </table>\n</body>\n</html>\n";
// ✨ 3. 메일 보내기
function sendMail() {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, transporter.sendMail({
                            from: '"PlayHive" <noreply@playhive.co.kr>',
                            to: "jedonge1995@gmail.com", // 👉 너가 직접 받을 이메일 주소
                            subject: "PlayHive 이메일 인증번호",
                            html: htmlTemplate
                                .replace("{email}", "dong@example.com") // 👉 테스트용 이메일
                                .replace("{code}", "123456"), // 👉 테스트용 코드
                        })];
                case 1:
                    _a.sent();
                    console.log("✅ 메일 전송 완료!");
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("❌ 메일 전송 실패:", error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
sendMail();
