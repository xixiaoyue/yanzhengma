class securityCode extends HTMLElement {
    constructor() {
        super();
        var identifying = this.getAttribute("id")
        var text = (this.getAttribute("text")?this.getAttribute("text"):null)
        var w = (Number(this.getAttribute("width")))?(Number(this.getAttribute("width"))):40+20
        var h = (Number(this.getAttribute("height"))?Number(this.getAttribute("height")):10 + 20)
        var line = Number(this.getAttribute("line"))?Number(this.getAttribute("line")):5
        var point = Number(this.getAttribute("point"))?Number(this.getAttribute("point")):20
        var number = Number(this.getAttribute("number"))?Number(this.getAttribute("number")):4
        var security = document.getElementById(identifying)
        var canvas = document.createElement('canvas');
        canvas.width = (Number(this.getAttribute("width")))?(Number(this.getAttribute("width"))):40+20
        canvas.height = (Number(this.getAttribute("height"))?Number(this.getAttribute("height")):0 + 20)
        security.appendChild(canvas)
        var ctx = canvas.getContext("2d")
        //依据给出的区间中生成随机数
        var RandomNumber = (max, min) => {
            return parseInt(Math.random() * (max - min) + min)
        }
        //随机生成RGB颜色
        var Randomcolor = (max, min) => {
            var r = RandomNumber(max, min)
            var g = RandomNumber(max, min)
            var b = RandomNumber(max, min)
            return `rgb(${r},${g},${b})`
        }
        //生成字母数字列表
        var writer = () => {
            var letter = []
            for (var i = 48; i <= 57; i++) {
                letter.push(String.fromCharCode(i))
            }
            for (var i = 97; i <= 122; i++) {
                letter.push(String.fromCharCode(i))
            }
            for (var i = 65; i <= 90; i++) {
                letter.push(String.fromCharCode(i))
            }
            return letter
        }
        //生成随机字符
        var randomwriter = () => {
             var sletter = writer()[RandomNumber(0, writer().length - 1)]
            console.log(sletter)
            return sletter
        }


        //干扰线
        var InterferingLine = () => {
            for (var i = 1; i < line+1; i++) {
                ctx.beginPath()
                ctx.moveTo(RandomNumber(0, w), RandomNumber(0, h))
                ctx.lineTo(RandomNumber(0, w), RandomNumber(0, h))
                ctx.lineWidth = RandomNumber(0, 1)
                ctx.strokeStyle = Randomcolor(180, 230)
                ctx.closePath()
                ctx.stroke()
            }
        }
        //随机生成噪点
        var NoisyPoint = () => {
            for (var i = 1; i <point+1; i++) {
                ctx.beginPath()
                ctx.arc(RandomNumber(0, w), RandomNumber(0, h), RandomNumber(1, 1), 0, 2 * Math.PI)
                ctx.closePath()
                ctx.fillStyle = Randomcolor(80, 150)
                ctx.fill()
            }
        }
        //随机颜色
        ctx.fillStyle = Randomcolor(180, 230)
        //填充背景
        ctx.fillRect(0, 0, w, h)
        //随机生成
        for (var m = 0; m <(text?text.length:number); m++) {
            ctx.font = RandomNumber(w / (text?text.length:number) * 1, w / (text?text.length:number) * 1.3) + "px sans-serif"
            ctx.fillStyle = Randomcolor(80, 150)
            ctx.textBaseline = 'top'
            ctx.save()
            ctx.translate(m * w / (text?text.length:number), w / (text?text.length:number) * 0.2)
            ctx.rotate(RandomNumber(-30, 30) * Math.PI / 180)
            ctx.fillText(text?text[m]:randomwriter(), w / (text?text.length:number) * 0.1, 0)
            ctx.restore()
        }
        InterferingLine()
        NoisyPoint()

    }

}
customElements.define(
    'security-code',
    securityCode
);

