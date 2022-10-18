import React, { useState, useRef } from 'react';

interface IProps {
    text: string,
}

function CanvasFrame(props: IProps) {

    const canvas = document.getElementById(props.text)//getbyid做法可行？？
    const ctx = (canvas as any).getContext('2d')
    var img = new Image()
    //设置图片地址
    img.src = "img/1.png"
    var scale = 0.5
    img.onload = function () {
        //设置宽高
        var w = Math.floor(img.width * scale), h = Math.floor(img.height * scale)
        //获取图片数据
        var imgData = ctx.getImgData(0, 0, w, h)
        //存储颜色列表
        var list = []
        for (var i = 0; i < imgData.data.length; i += 4) {
            list.push(
                `#${(imgData.data[i])}${(imgData.data[i + 1])}${(imgData.data[i + 2])}${(imgData.data[i + 3])}`
            )
        }
        //展示像素矩阵
        var box = document.getElementById("box")
        var data = new Array()
        for (var i = 0; i < h; i++) {
            //创建行数组
            data[i] = new Array()
            var row//这不知道为啥报错？？拆成两行就不报错了
            row = document.createElement("div")
            row.style.display = 'flex'
            for (var j = 0; j < w; j++) {
                //创建每一个像素块
                data[i][j] = list[i * w + j]
                var cell = document.createElement("div")
                cell.style.background = data[i][j]
                cell.style.width = '10px'
                cell.style.height = '10px'
                cell.setAttribute("id", `${i}_${j}`)
                row.append(cell)
            }
            (box as any).append(row)
        }
        //像素放入文本框
        var e = document.createElement('textarea')
        e.value = JSON.stringify(list);//不知道为啥必须加";"？？
        (box as any).append(e)
    }


    return (
        <div>
            <canvas id={props.text}></canvas>
            <div id="box"></div>
        </div>
    )
}

export default CanvasFrame