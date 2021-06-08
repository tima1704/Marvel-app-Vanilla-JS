const body = document.body;
const cay_hash = "3bbec084579cf27e0b80471f69128336";
const api_cay = 'e53db8034e6247d000be41fd3d7cd4e1';
const $search = document.querySelector('.search');
const content_cards = document.querySelector('.content_cards');
// const page = document.querySelector('.page');
// const aroow_back = document.querySelector('.aroow_back');
// const arrow_next = document.querySelector('.aroow_next');
// let offsetc = 0;
// let pagec = 1;
const LIMIT = 21;
// let total_heroes = 1493;
// const mathTotal = Math.floor(total_heroes / LIMIT);

const getRequest = (offset = 0, urlSearch = '', cb) => {
    const url = `http://gateway.marvel.com/v1/public/characters?&limit=${LIMIT}&offset=${offset}${!urlSearch ? null : `&nameStartsWith=${urlSearch}`}&orderBy=-modified&ts=1&apikey=${api_cay}&hash=${cay_hash}`; 
    fetch(url)
    .then(res => res.json())
    .then(r => {
        cb(r.data)
    })
    .catch(err => {
        console.log(err);
    });
};
const info = (id , cb) => {
    const baseURL = `http://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${api_cay}&hash=${cay_hash}`;
    fetch(baseURL)
    .then(res => res.json())
    .then(r => {
        cb(r.data)
    })
    .catch(err => {
        console.log(err);
    })
};
window.addEventListener('load' , () => {
    getRequest(0,'',res => {
            console.log(res);
            const temp = res.results.map(item => cardTemp(item)).join('');
            content_cards.innerHTML = temp; 
        })
})
function cardTemp({name,thumbnail,id}){
    return`
    <div onclick="activeinfo(${id})" class="card" style="background: url('${thumbnail.path}.${thumbnail.extension}')center / cover no-repeat;">
        <h2>${name}</h2>
    </div>
    `
}
$search.addEventListener('input' , e => {
    const value = e.target.value;
    if(!value){
        getRequest(0,'',res => {
                const temp = res.results.map(item => cardTemp(item)).join('');
                content_cards.innerHTML = temp;
            })
    }else{
        getRequest(0,value,res => {
                if(res.results.length === 0){
                    content_cards.innerHTML = `<h1>Не найдено</h1>`
                }else{
                    const temp = res.results.map(item => cardTemp(item)).join('');
                    content_cards.innerHTML = temp;
                }
            }
        )
    }
})
// // next-back


// window.addEventListener('load' , () => {
//     page.innerHTML = pagec;
//     aroow_back.setAttribute('disabled' , true);
// });
// arrow_next.addEventListener('click' , e=> {
//     e.preventDefault();
//     aroow_back.removeAttribute('disabled');

//     if(pagec >=1 && pagec <= mathTotal){
//         if(pagec === mathTotal){
//             getRequest('',`offset=${offsetc += LIMIT}&limit=${LIMIT}` ,res => {
//                 pagec++;
//                 page.innerHTML = pagec;
//                 let temp = res.results.map(item => cardTemp(item)).join('');
//                 content_cards.innerHTML = temp;
//                 console.log(temp);
//             });
//         }else{
//             getRequest('', `offset=${offsetc += LIMIT}&limit=${LIMIT}` ,res => {
//                 pagec++;
//                 page.innerHTML = pagec;
//                 let temp = res.results.map(item => cardTemp(item)).join('');
//                 content_cards.innerHTML = temp;
//                 console.log(temp);
//             })
//         }
//     }
// });

// aroow_back.addEventListener('click' , e => {
//     e.preventDefault();
//     if(pagec > 1){
//         pagec --;
//         if(pagec === 1){
//             aroow_back.setAttribute('disabled' , true);
//             offsetc = 0;
//             page.innerHTML = pagec;
//             getRequest('' ,`offset=${offsetc}&limit=${LIMIT}` , res => {
//                 let temp = res.results.map(item => cardTemp(item)).join('');
//                 content_cards.innerHTML = temp;
//             })
//         }else{
//             getRequest('' ,`offset=${offsetc -= LIMIT}&limit=${LIMIT}`, res => {
//                 let temp = res.results.map(item => cardTemp(item)).join('');
//                 content_cards.innerHTML = temp;
//             })
//         }
//     }
// })