"use strict";(self.webpackChunksocial_network=self.webpackChunksocial_network||[]).push([[926],{3676:(n,e,r)=>{r.d(e,{t:()=>s});var t,a=r(168),o=r(198),i=r(7884),l=r(2027);const s=i.ZP.h2(t||(t=(0,a.Z)(["\n    position: relative;\n    word-wrap: break-word;\n    padding-bottom: min(20px, 2vw);\n    width: 100%;\n    color: ",";\n    ",'\n    &::before {\n        position: absolute;\n        content: "";\n        height: 1px;\n        width: 100%;\n        left: 0;\n        top: 100%;\n        background-color: ',";\n    }\n    @media "," {\n        padding-bottom: 20px;\n    }\n"])),l.r.color.text.primary,(0,o.L)({weight:700,Fmin:14,Fmax:26}),l.r.color.background.primary,l.r.media.mobile)},6980:(n,e,r)=>{r.d(e,{c:()=>l});var t,a=r(168),o=r(7884),i=r(2027);const l=o.ZP.section(t||(t=(0,a.Z)(["\n    display: flex;\n    border-radius: 10px;\n    background-color: ",";\n    flex-direction: column;\n    color: ",";\n    padding: min(30px, 2vw);\n    height: fit-content;\n    gap: min(30px, 2vw);\n    box-shadow: ",";\n"])),i.r.color.background.block,i.r.color.text.primary_dark,i.r.shadow.block)},6858:(n,e,r)=>{r.d(e,{S:()=>N});var t,a,o,i=r(3676),l=r(7082),s=r(2791),d=r(168),c=r(198),u=r(5199),h=r(1523),p=r(7884),m=r(2027);const g={Friend:(0,p.ZP)(h.OL)(t||(t=(0,d.Z)(["\n    display: flex;\n    position: relative;\n    align-items: center;\n    justify-content: center;\n    flex-wrap: wrap;\n    height: 100%;\n    width: 100%;\n    gap: 6px;\n    padding: min(15px, 2vw);\n    &::after {\n        position: absolute;\n        content: '';\n        width: 100%;\n        height: 1px;\n        background-color: ",";\n        bottom: 0%;\n    }\n    &:hover {\n        outline: 1px solid ",";\n        background-color: ",";\n        border-radius: 10px;\n    }\n    @media "," {\n        flex-direction: column;\n        justify-content: flex-start;\n        max-width: 20%;\n        min-width: 65px;\n    }\n"])),m.r.color.background.primary,m.r.color.background.primary,m.r.color.background.primary,m.r.media.mobile),Photo:(0,p.ZP)(u.q)(a||(a=(0,d.Z)(["\n    width: 45%;\n"]))),Name:p.ZP.span(o||(o=(0,d.Z)(["\n    width: 53%;\n    text-align: center;\n    ","\n    color: ",";\n    word-wrap: break-word;\n    overflow: hidden;\n"])),(0,c.L)({weight:400,Fmin:10,Fmax:14}),m.r.color.text.primary_dark)};var x=r(184);const f=(0,s.memo)((n=>(0,x.jsxs)(g.Friend,{to:l.m.Profile+n.friendData.id,children:[(0,x.jsx)(g.Photo,{avatarURL:n.friendData.photos.small}),(0,x.jsx)(g.Name,{children:n.friendData.name})]})));var w,b,v,j=r(8472),k=r(80),y=r(6980),P=r(4085);const Z={FriendsBlock:(0,p.ZP)(y.c)(w||(w=(0,d.Z)(["\n    display: flex;\n"]))),FriendsList:p.ZP.div(b||(b=(0,d.Z)(["\n    display: flex;\n    align-items: center;\n    width: 100%;\n    justify-content: center;\n    flex-direction: column;\n    overflow-y: auto;\n    overflow-x: hidden;\n    @media "," {\n        flex-direction: row;\n    }\n"])),m.r.media.mobile),FriendsPagination:(0,p.ZP)(P.t)(v||(v=(0,d.Z)(["\n    ","\n    height: 1em;\n"])),(0,c.L)({weight:700,Fmin:10,Fmax:13}))};var L=r(8112),F=r(5978);const C=n=>n.friends.possibleFriends,U=n=>n.friends.friends;var A=r(1113);const N=(0,s.memo)((n=>{let{headerName:e,className:r,isFriends:t=!0}=n;const{getFriends:a}=(0,L.o)(),{totalUsersCount:o,currentPage:l,usersOnPage:d,users:c}=(0,F.v9)(t?U:C),u=(0,F.v9)(A.DU),h=function(n,e){const r=Math.ceil(n),t=Math.floor(e);return Math.floor(Math.random()*(t-r+1)+r)}(1,Math.ceil(o/d));(0,s.useEffect)((()=>{a(h,d,t)}),[]);return(0,x.jsxs)(Z.FriendsBlock,{id:e.toLowerCase().replaceAll(" ","-"),className:r,children:[(0,x.jsx)(k.A,{justify:"space-between",children:(0,x.jsx)(j.z,{onClick:()=>{a(h,d,t)},variant:"link",ariaLabel:"Randomize button",children:(0,x.jsx)(i.t,{children:e})})}),(0,x.jsx)(Z.FriendsList,{children:c.map((n=>(0,x.jsx)(f,{friendData:n},n.id)))}),(0,x.jsx)(k.A,{justify:"center",direction:"row",children:(0,x.jsx)(Z.FriendsPagination,{appIsLoading:u,currentPage:l,totalUsersCount:o,usersOnPage:d,pagesPortion:2,pageChangeHandler:n=>{a(n,d,t)}})})]})}))},4085:(n,e,r)=>{r.d(e,{t:()=>f});var t,a,o=r(8472),i=r(80),l=r(5545),s=r(5705),d=r(2791),c=r(168),u=r(9250),h=r(7884),p=r(2027);const m=(0,h.ZP)(u.I)(t||(t=(0,c.Z)(["\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    box-shadow: ",";\n    color: ",";\n    z-index: 999;\n"])),p.r.shadow.text,p.r.color.text.primary),g={Pagination:(0,h.ZP)(i.A)(a||(a=(0,c.Z)(["\n    position: relative;\n    button {\n        min-height: 15px;\n        min-width: 15px;\n    }\n"]))),PaginationInput:m};var x=r(184);const f=(0,d.memo)((n=>{const{currentPage:e,usersOnPage:r,totalUsersCount:t,pagesPortion:a,className:c,appIsLoading:u,pageChangeHandler:h}=n,p=Math.ceil(t/r),m=Array.from({length:p},((n,e)=>e+1)),f=Math.ceil(m.length/a),[w,b]=(0,d.useState)(Math.ceil(e/a)),[v,j]=(0,d.useState)(!1),k=w*a-a,y=w*a;(0,d.useEffect)((()=>{b(Math.ceil(e/a))}),[e]);const P=(0,s.TA)({initialValues:{page:e},enableReinitialize:!0,onSubmit:n=>{h(n.page),j(!1)},validate:n=>{const e={};return n.page?(n.page<1||n.page>p)&&(e.page="wrong range"):e.page="Page required",e}});return(0,x.jsx)(g.Pagination,{direction:"column",justify:"center",align:"center",className:c,children:(0,x.jsxs)(i.A,{justify:"center",children:[p>a&&(0,x.jsx)(o.z,{className:n.className,ariaLabel:"Change pages range - button",variant:"link",disabled:n.appIsLoading,onClick:()=>{b(w<=1?f:n=>n-1)},children:(0,x.jsx)(l.J,{iconId:"leftArrow",viewBox:"-5 7 20 20",height:"100%",width:"100%"})}),(0,x.jsx)(i.A,{justify:"center",align:"center",children:m.filter(((n,e)=>e>=k&&e<y)).map(((r,t,a)=>(0,x.jsx)(o.z,{ariaLabel:"Go to page button",className:n.className,variant:"link",disabled:e===r||n.appIsLoading,isActive:e===r,onClick:()=>{h(r)},children:t===a.length-1?r.toString():r.toString()+","},r)))}),(0,x.jsxs)(i.A,{justify:"center",align:"center",children:[p>a&&v&&(0,x.jsx)("form",{onSubmit:P.handleSubmit,children:(0,x.jsx)(g.PaginationInput,{type:"number",placeholder:"1-".concat(p),error:P.errors.page&&P.touched.page?"true":"false",name:"page",min:"1",max:p,value:P.values.page,onChange:n=>{P.handleChange(n)},onBlur:n=>{P.handleBlur(n),P.handleSubmit(),j(!1)},autoFocus:!0})}),y<p&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(o.z,{className:c,ariaLabel:"Show pages input button",variant:"link",onClick:()=>{j((n=>!n))},children:"\xa0...\xa0"}),(0,x.jsx)(o.z,{ariaLabel:"Go to page button",className:c,variant:"link",disabled:e===p||n.appIsLoading,isActive:e===p,onClick:()=>{h(p)},children:p.toString()})]})]}),p>a&&(0,x.jsx)(o.z,{className:c,variant:"link",ariaLabel:"Change pages range + button",disabled:u,onClick:()=>{b(w>=f?1:n=>n+1)},children:(0,x.jsx)(l.J,{iconId:"rightArrow",height:"100%",width:"100%",viewBox:"15 7 20 20"})})]})})}))},2376:(n,e,r)=>{r.d(e,{P:()=>p});var t,a=r(5545),o=r(2791),i=r(9271),l=r(168),s=r(1523),d=r(7884),c=r(2027);const u={ToTop:(0,d.ZP)(s.rU)(t||(t=(0,l.Z)(["\n    position: fixed;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border: 1px solid;\n    background-color: ",";\n    height: 30px;\n    width: 30px;\n    top: 95%;\n    left: 95%;\n    padding: 5px;\n    border-radius: 50%;\n    transform: translate(-95%, -95%) rotate(90deg);\n    z-index: 99999;\n    &:hover {\n        box-shadow: ",";\n    }\n"])),c.r.color.background.primary,c.r.shadow.block)};var h=r(184);const p=(0,o.memo)((n=>{let{anchor_id:e}=n;const[r,t]=(0,o.useState)(!1),l=(0,i.TH)(),s=(0,o.useRef)("");(0,o.useEffect)((()=>{const n=document.querySelector("main"),e=()=>{n&&n.scrollTop>300?t(!0):t(!1)};return n&&n.addEventListener("scroll",e),()=>{n&&n.removeEventListener("scroll",e)}}),[]),(0,o.useEffect)((()=>{l.hash&&(s.current=l.hash.slice(1)),s.current&&document.getElementById(s.current)&&setTimeout((()=>{var n;null===(n=document.getElementById(s.current))||void 0===n||n.scrollIntoView({behavior:"smooth",block:"start"}),s.current=""}),100)}),[l]);return r?(0,h.jsx)(u.ToTop,{to:"#"+e,onClick:()=>{document.location="#"+e},children:(0,h.jsx)(a.J,{iconId:"leftArrow",viewBox:"-1 9 14 14"})}):null}))},5926:(n,e,r)=>{r.r(e),r.d(e,{default:()=>E});var t,a,o,i,l,s,d=r(6858),c=r(3676),u=r(5199),h=r(8472),p=r(2791),m=r(168),g=r(1523),x=r(7884),f=r(198),w=r(2027);const b={User:(0,x.ZP)(g.OL)(t||(t=(0,m.Z)(["\n    display: flex;\n    position: relative;\n    width: 100%;\n    justify-content: space-between;\n    ","\n    gap: 20px;\n    padding: 20px 0;\n    &::after {\n        position: absolute;\n        content: '';\n        width: 100%;\n        height: 1px;\n        background-color: ",";\n        bottom: 0;\n    }\n    &:hover {\n        outline: 1px solid ",";\n        background-color: ",";\n        border-radius: 10px;\n    }\n"])),(0,f.L)({weight:300,Fmin:10,Fmax:16}),w.r.color.background.primary,w.r.color.background.primary,w.r.color.background.primary),Info:x.ZP.div(a||(a=(0,m.Z)(["\n    width: 65%;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    color: ",";\n    gap: 15px;\n"])),w.r.color.text.primary_dark),Photo:x.ZP.div(o||(o=(0,m.Z)(["\n    display: flex;\n    flex-direction: column;\n    border-radius: 50% 50%;\n    object-fit: cover;\n    aspect-ratio: 1/1;\n    width: 54px;\n    justify-self: center;\n"]))),Name:x.ZP.p(i||(i=(0,m.Z)(["\n    text-align: center;\n    overflow-wrap: anywhere;\n    ","\n    color: ",";\n"])),(0,f.L)({weight:400,Fmin:10,Fmax:14}),w.r.color.text.primary_dark),Status:x.ZP.p(l||(l=(0,m.Z)(["\n    text-align: start;\n    white-space: normal;\n    width: 80%;\n    ","\n    color: ",";\n"])),(0,f.L)({weight:400,Fmin:12,Fmax:16}),w.r.color.text.primary_dark),Container:x.ZP.div(s||(s=(0,m.Z)(["\n    display: flex;\n    width: 30%;\n    align-items: center;\n    justify-content: center;\n"])))};var v=r(7082),j=r(184);const k=(0,p.memo)((n=>{const{id:e,followed:r,status:t,isLoading:a,name:o,photos:i}=n.user,{follow:l,unfollow:s}=n;return(0,j.jsxs)(b.User,{to:v.m.Profile+e,children:[(0,j.jsxs)(b.Info,{children:[(0,j.jsxs)(b.Photo,{children:[(0,j.jsx)(u.q,{avatarURL:i.small}),(0,j.jsx)(b.Name,{children:o+" "})]}),t?(0,j.jsx)(b.Status,{children:t+" "}):(0,j.jsx)(b.Status,{})]}),(0,j.jsx)(b.Container,{children:(0,j.jsx)(h.z,{ariaLabel:"".concat(r?"Unfollow":"Follow"," button"),variant:r?"primary":"outlined",onClick:n=>(n.preventDefault(),r?s(e):l(e)),disabled:a,children:r?"UNFOLLOW":"FOLLOW"})})]})}));var y=r(80),P=r(5978),Z=r(1113);const L=n=>n.users;var F,C,U=r(8112),A=r(6980),N=r(4085);const S={UsersBlock:(0,x.ZP)(A.c)(F||(F=(0,m.Z)(["\n    display: flex;\n    width: 100%;\n    height: 132vh;\n    overflow-y: auto;\n    overflow-x: hidden;\n    padding-bottom: 65px;\n    @media "," {\n        width: 100%;\n    }\n"])),w.r.media.mobile),UsersPagination:(0,x.ZP)(N.t)(C||(C=(0,m.Z)(["\n    height: 1em;\n"])))},I=(0,p.memo)((()=>{const n=(0,P.v9)(L),{usersFilter:e,usersOnPage:r,searchTerm:t,currentPage:a,totalUsersCount:o}=n,i=(0,P.v9)(Z.DU),{getUsers:l,changeUsersFilter:s,followUser:d,unfollowUser:u}=(0,U.o)();(0,p.useEffect)((()=>{switch(e){case"all":default:l(1,r,null,t);break;case"followed":l(1,r,!0,t);break;case"unfollowed":l(1,r,!1,t)}}),[e,t]);return(0,j.jsxs)(S.UsersBlock,{children:[(0,j.jsx)(c.t,{id:"users-block",children:"Users"}),(0,j.jsxs)(y.A,{justify:"center",gap:"20px",children:[(0,j.jsx)(h.z,{ariaLabel:"All filter button",variant:"link",isActive:"all"===e,disabled:i,onClick:()=>s("all"),children:"All"}),(0,j.jsx)(h.z,{ariaLabel:"Followed filter button",variant:"link",isActive:"followed"===e,disabled:i,onClick:()=>s("followed"),children:"Followed"}),(0,j.jsx)(h.z,{ariaLabel:"Unfollowed filter button",variant:"link",isActive:"unfollowed"===e,disabled:i,onClick:()=>s("unfollowed"),children:"Unfollowed"})]}),(0,j.jsx)(j.Fragment,{children:n.users.map((n=>(0,j.jsx)(k,{user:n,follow:d,unfollow:u},n.id)))}),(0,j.jsx)(S.UsersPagination,{pagesPortion:7,usersOnPage:r,currentPage:a,appIsLoading:i,totalUsersCount:o,pageChangeHandler:n=>{switch(e){case"all":default:l(n,r,null,t);break;case"followed":l(n,r,!0,t);break;case"unfollowed":l(n,r,!1,t)}}})]})}));var z,B,O=r(2376);const M={Users:x.ZP.main(z||(z=(0,m.Z)(["\n    display: flex;\n    flex: 1;\n    justify-content: space-between;\n    @media "," {\n        flex-wrap: wrap;\n    }\n"])),w.r.media.mobile),Wrapper:x.ZP.div(B||(B=(0,m.Z)(["\n    display: flex;\n    flex-direction : column;\n    gap: min(30px, 2vw);\n    min-width: 170px;\n    max-width: 20%;\n    @media "," {\n        display: none;\n    }\n"])),w.r.media.mobile)},E=(0,p.memo)((()=>(0,j.jsxs)(M.Users,{id:"users",children:[(0,j.jsx)(O.P,{anchor_id:"users-block"}),(0,j.jsx)(I,{}),(0,j.jsxs)(M.Wrapper,{children:[(0,j.jsx)(d.S,{headerName:"Friends"}),(0,j.jsx)(d.S,{headerName:"Might know",isFriends:!1})]})]})))}}]);
//# sourceMappingURL=926.e65acf4c.chunk.js.map