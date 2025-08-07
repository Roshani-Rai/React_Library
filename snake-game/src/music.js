import React from "react"
import {Howl} from 'howler'
import buttonMusic from '../public/click.mp3'

export const ClickMusic=()=>{
   const audio=new Howl({
    src:[buttonMusic],
    volume:1,
   });
    audio.play();
}
