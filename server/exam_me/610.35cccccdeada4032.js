"use strict";(self.webpackChunkexam_me=self.webpackChunkexam_me||[]).push([[610],{610:(i,n,e)=>{e.r(n),e.d(n,{TuiFontSize:()=>o}),e(792);const o=e(220).Extension.create({name:"fontSize",addOptions:()=>({types:["textStyle"]}),addGlobalAttributes(){return[{types:this.options.types,attributes:{fontSize:{default:null,parseHTML:({style:t})=>t.fontSize,renderHTML:({fontSize:t})=>t?{style:`font-size: ${t}`}:{}}}}]},addCommands:()=>({setFontSize:t=>({chain:a})=>a().setMark("textStyle",{fontSize:t}).run(),unsetFontSize:()=>({chain:t})=>t().setMark("textStyle",{fontSize:null}).removeEmptyTextStyle().run()})})}}]);