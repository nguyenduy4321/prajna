const messages = [
  "QUÁN TỰ TẠI BỒ TÁT HÀNH THÂM BÁT NHÃ BA LA MẬT ĐA THỜI",
  "CHIẾU KIẾN NGŨ UẨN GIAI KHÔNG",
  "ĐỘ NHẤT THIẾT KHỔ ÁCH",
  "XÁ LỢI TỬ",
  "SẮC BẤT DỊ KHÔNG, KHÔNG BẤT DỊ SẮC",
  "SẮC TỨC THỊ KHÔNG, KHÔNG TỨC THỊ SẮC",
  "THỌ TƯỞNG HÀNH THỨC DIỆC PHỤC NHƯ THỊ",
  "XÁ LỢI TỬ, THỊ CHƯ PHÁP KHÔNG TƯỚNG",
  "BẤT SINH BẤT DIỆT, BẤT CẤU BẤT TỊNH, BẤT TĂNG BẤT GIẢM",
  "THỊ CỐ KHÔNG TRUNG VÔ SẮC",
  "VÔ NHÃN NHĨ TỶ THIỆT THÂN Ý",
  "VÔ SẮC THANH HƯƠNG VỊ XÚC PHÁP",
  "VÔ NHÃN GIỚI NÃI CHÍ VÔ Ý THỨC GIỚI",
  "VÔ VÔ MINH, DIỆC VÔ VÔ MINH TẬN",
  "NÃI CHÍ VÔ LÃO TỬ, DIỆC VÔ LÃO TỬ TẬN",
  "VÔ KHỔ TẬP DIỆT ĐẠO",
  "VÔ TRÍ DIỆC VÔ ĐẮC, DĨ VÔ SỞ ĐẮC CỐ",
  "BỒ ĐỀ TÁT ĐỎA Y BÁT NHÃ BA LA MẬT ĐA CỐ",
  "TÂM VÔ QUÁI NGẠI",
  "VÔ QUÁI NGẠI CỐ, VÔ HỮU KHỦNG BỐ",
  "VIỄN LY ĐIÊN ĐẢO MỘNG TƯỞNG, CỨU CÁNH NIẾT BÀN",
  "TAM THẾ CHƯ PHẬT Y BÁT NHÃ BA LA MẬT ĐA CỐ",
  "ĐẮC A NẬU ĐA LA TAM MIỆU TAM BỒ ĐỀ",
  "CỐ TRI BÁT NHÃ BA LA MẬT ĐA",
  "THỊ ĐẠI THẦN CHÚ",
  "THỊ ĐẠI MINH CHÚ",
  "THỊ VÔ THƯỢNG CHÚ",
  "THỊ VÔ ĐẲNG ĐẲNG CHÚ",
  "NĂNG TRỪ NHẤT THIẾT KHỔ, CHÂN THẬT BẤT HƯ",
  "CỐ THUYẾT BÁT NHÃ BA LA MẬT ĐA CHÚ",
  "TỨC THUYẾT CHÚ VIẾT",
  "YẾT ĐẾ, YẾT ĐẾ, BA LA YẾT ĐẾ, BA LA TĂNG YẾT ĐẾ, BỒ ĐỀ TÁT BÀ HA"
];

// Theme Gold/Amber High-Tech
var colorrain = 45; // Gold Hue

var M = {
    settings: {
        COL_WIDTH: 20,
        COL_HEIGHT: 25,
        VELOCITY_PARAMS: { min: 1, max: 2 }
    },
    animation: null,
    c: null,
    ctx: null,
    lineC: null,
    ctx2: null,
    WIDTH: window.innerWidth,
    HEIGHT: window.innerHeight,
    COLUMNS: null,
    codes: [],
    createCodeLoop: null,
    codesCounter: 0,
    
    init: function () {
        "use strict";
        M.c = document.getElementById('canvas');
        M.ctx = M.c.getContext('2d');
        M.c.width = M.WIDTH;
        M.c.height = M.HEIGHT;
        M.ctx.shadowBlur = 0;
        M.ctx.fillStyle = '#000';
        M.ctx.fillRect(0, 0, M.WIDTH, M.HEIGHT);
        
        M.COLUMNS = Math.ceil(M.WIDTH / M.settings.COL_WIDTH);
        for (var i = 0; i < M.COLUMNS; i += 1) {
            M.codes[i] = [];
            M.codes[i][0] = {
                'open': true,
                'position': {'x': 0, 'y': 0},
                'strength': 0
            };
        }
        M.loop();
        M.createLines();
        M.createCode();
        
        window.onresize = function () {
            window.cancelAnimationFrame(M.animation);
            M.animation = null;
            M.ctx.clearRect(0, 0, M.WIDTH, M.HEIGHT);
            M.codesCounter = 0;
            M.ctx2.clearRect(0, 0, M.WIDTH, M.HEIGHT);
            M.WIDTH = window.innerWidth;
            M.HEIGHT = window.innerHeight;
            M.init();
        };
    },
    
    loop: function () {
        "use strict";
        M.animation = requestAnimationFrame(function () { M.loop(); });
        M.draw();
    },
    
    draw: function () {
        "use strict";
        var velocity, height, x, y, c, ctx, i = 0;
        M.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        M.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        M.ctx.fillRect(0, 0, M.WIDTH, M.HEIGHT);
        M.ctx.globalCompositeOperation = 'source-over';
        for (i = 0; i < M.COLUMNS; i += 1) {
            if (M.codes[i][0].canvas) {
                velocity = M.codes[i][0].velocity;
                height = M.codes[i][0].canvas.height;
                x = M.codes[i][0].position.x;
                c = M.codes[i][0].canvas;
                ctx = c.getContext('2d');
                if ( i%2 == 0 ){
                    y = M.codes[i][0].position.y + height;
                    M.ctx.drawImage(c, x, y, M.settings.COL_WIDTH, height);
                    if ((M.codes[i][0].position.y + height) < M.HEIGHT) {
                        M.codes[i][0].position.y -= velocity;
                    } else {
                        M.codes[i][0].position.y = height;
                    }
                } else {
                    y = M.codes[i][0].position.y - height;
                    M.ctx.drawImage(c, x, y, M.settings.COL_WIDTH, height);
                    if ((M.codes[i][0].position.y - height) < M.HEIGHT) {
                        M.codes[i][0].position.y += velocity;
                    } else {
                        M.codes[i][0].position.y = 0;
                    }
                }
            }
        }
    },
    
    createCode: function () {
        "use strict";
        clearTimeout(M.createCodeLoop);
        var randomInterval = M.randomFromInterval(0, 100), column = M.assignColumn();
        if (column) {
            var codeVelocity = (Math.random() * (M.settings.VELOCITY_PARAMS.max - M.settings.VELOCITY_PARAMS.min)) + M.settings.VELOCITY_PARAMS.min;
            
            var randomMsgIndex = M.randomFromInterval(0, messages.length - 1);
            var selectedMessage = messages[randomMsgIndex];
            var codeLength = selectedMessage.length + 1;
            
            // Clear old characters
            M.codes[column] = [ M.codes[column][0] ];
            
            M.codes[column][0].position = {'x': (column * M.settings.COL_WIDTH), 'y': 0};
            M.codes[column][0].velocity = codeVelocity;
            M.codes[column][0].strength = M.codes[column][0].velocity / M.settings.VELOCITY_PARAMS.max;
            
            M.insertCustomMessages(codeLength, selectedMessage, column);
            M.createCanvii(column);
            M.codesCounter += 1;
        }
        M.createCodeLoop = setTimeout(M.createCode, randomInterval);
    },
    
    insertCustomMessages: function (codeLength, message, column) {
        "use strict";
        for (var i = 1; i <= codeLength; i = i + 1) {
            var reverseString = message.split('').reverse().join('');
            M.codes[column][i] = reverseString.substring(i - 1, i);
        }
    },
    
    createCanvii: function (i) {
        "use strict";
        var j, text, fadeStrength, codeLen = M.codes[i].length - 1;
        var canvHeight = codeLen * M.settings.COL_HEIGHT;
        var velocity = M.codes[i][0].velocity;
        var strength = M.codes[i][0].strength;
        var newCanv = document.createElement('canvas');
        var newCtx = newCanv.getContext('2d');
        
        newCanv.width = M.settings.COL_WIDTH;
        newCanv.height = canvHeight;
        newCtx.shadowOffsetX = 0;
        newCtx.shadowOffsetY = 0;
        newCtx.shadowBlur = 0;
        newCtx.globalCompositeOperation = 'source-over';
        newCtx.font = '30px matrix-code';
        
        if (i % 2 == 1){
            for (j = 1; j < codeLen; j += 1) {
                text = M.codes[i][j];
                if (j < 3) {
                    newCtx.shadowColor = 'hsla(' + colorrain + ', 100%, 70%)';
                    newCtx.shadowBlur = 5;
                    newCtx.fillStyle = 'hsla(' + colorrain + ', 100%, ' + (100 - (j * 10)) + '%, ' + (strength + 0.3) + ')';
                } else if (j > (codeLen - 3)) {
                    fadeStrength = 1 - (j / codeLen);
                    newCtx.fillStyle = 'hsla(' + colorrain + ', 100%, 40%, ' + fadeStrength + ')';
                } else {
                    newCtx.fillStyle = 'hsla(' + colorrain + ', 100%, 50%, ' + strength + ')';
                }
                newCtx.fillText(text, 0, (canvHeight - (j * M.settings.COL_HEIGHT)));
            }
        } else {
            for (j = codeLen; j > 1; j -= 1) {
                text = M.codes[i][j];
                if (j < (codeLen - 3)) {
                    newCtx.shadowColor = 'hsla(' + colorrain + ', 100%, 70%)';
                    newCtx.shadowBlur = 5;
                    newCtx.fillStyle = 'hsla(' + colorrain + ', 100%, ' + (j * 10) + '%, ' + (strength + 0.3) + ')';
                } else if (j < 3) {
                    fadeStrength = 1 - (j / codeLen);
                    newCtx.fillStyle = 'hsla(' + colorrain + ', 100%, 40%, ' + fadeStrength + ')';
                } else {
                    newCtx.fillStyle = 'hsla(' + colorrain + ', 100%, 50%, ' + strength + ')';
                }
                newCtx.fillText(text, 0, (canvHeight - (j * M.settings.COL_HEIGHT)));
            }
        }
        M.codes[i][0].canvas = newCanv;
    },
    
    createLines: function () {
        "use strict";
        M.linesC = document.createElement('canvas');
        M.linesC.width = M.WIDTH;
        M.linesC.height = M.HEIGHT;
        M.linesC.style.position = 'absolute';
        M.linesC.style.top = 0;
        M.linesC.style.left = 0;
        M.linesC.style.zIndex = 10;
        M.linesC.style.pointerEvents = 'none';
        document.body.appendChild(M.linesC);
        
        var linesYBlack = 0, linesYWhite = 0;
        M.ctx2 = M.linesC.getContext('2d');
        M.ctx2.beginPath();
        M.ctx2.lineWidth = 1;
        M.ctx2.strokeStyle = 'rgba(0, 0, 0, 0.7)';
        while (linesYBlack < M.HEIGHT) {
            M.ctx2.moveTo(0, linesYBlack);
            M.ctx2.lineTo(M.WIDTH, linesYBlack);
            linesYBlack += 5;
        }
        M.ctx2.lineWidth = 0.15;
        M.ctx2.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        while (linesYWhite < M.HEIGHT) {
            M.ctx2.moveTo(0, linesYWhite + 1);
            M.ctx2.lineTo(M.WIDTH, linesYWhite + 1);
            linesYWhite += 5;
        }
        M.ctx2.stroke();
    },
    
    assignColumn: function () {
        "use strict";
        return M.randomFromInterval(0, (M.COLUMNS - 1));
    },
    
    randomFromInterval: function (from, to) {
        "use strict";
        return Math.floor(Math.random() * (to - from + 1 ) + from);
    }
};

let faviconAngle = 0;
function animateFavicon() {
    const canvas = document.getElementById('favicon-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;
    const radius = 14;

    ctx.clearRect(0, 0, width, height);

    ctx.translate(cx, cy);
    ctx.rotate(faviconAngle);

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#FFD700'; // Gold
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#FFD700';
    ctx.fill();

    ctx.lineWidth = 2;
    for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(radius, 0);
        ctx.stroke();
        ctx.rotate(Math.PI / 4);
    }

    ctx.rotate(-faviconAngle);
    ctx.translate(-cx, -cy);

    faviconAngle += 0.15;

    const link = document.getElementById('favicon');
    if (link) {
        link.href = canvas.toDataURL('image/png');
    }

    setTimeout(animateFavicon, 100);
}

window.onload = function () {
    "use strict";
    M.init();
    animateFavicon();
};
