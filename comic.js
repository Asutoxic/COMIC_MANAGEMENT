class Comic {
    constructor(id, namecomic, poster, category) {
        this.id = id;
        this.namecomic = namecomic;
        this.poster = poster;
        this.category = category;
    }
}
let Comics = []
const key_data = "comic_data";

function init() {
    if(getData(key_data) == null) {
        Comics = [
            new Comic(1,
                "Nguyên Tôn",
                "https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.6435-9/71038002_2398076513802274_3608534524557787136_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=730e14&_nc_ohc=Gc9Ol9B1X1MAX__J4aW&_nc_ht=scontent.fsgn2-3.fna&oh=00_AT-b0yDKohLuGfIMvQ2pGSiURtUSLsvxuKwa5R8r-p8DIg&oe=62B7B78F",
                "Manhua"),
            new Comic(2,
                "Đấu La Đại Lục",
                "https://sstruyen.com/assets/img/story/au-la-ai-luc.jpg",
                "Manhua"),
            new Comic(3,
                "Hoa Sơn Tái Xuất",
                "https://media.cocomic.net/images/fullsize/2021/04/24/hoa-son-tai-khoi.jpg",
                "Manhwa"),
            new Comic(4,
                "Cuồng Ma Tái Thế",
                "https://st.nettruyenhot.com/poster/20927/cuong-ma-tai-the-20927.jpg",
                "Manhwa"),
            new Comic(5,
                "Ngã Lão Ma Thần",
                "https://i1.wp.com/doctruyen3qi.com/images/comics/nga-lao-ma-than-1632985359.jpg",
                "Manhwa"),
            new Comic(6,
                "One Piece",
                "https://media5.sgp1.digitaloceanspaces.com/wp-content/uploads/2021/10/13143410/One-Piece-iPhone-Wallpapers.jpg",
                "Manga"),
            new Comic(7,
                "Thanh Gươm Diệt Quỷ",
                "https://upload.wikimedia.org/wikipedia/vi/7/7e/Kimetsu_no_Yaiba_Blu-ray_Disc_Box_1_art.jpg",
                "Manga"),
        ]
        setData(key_data, Comics)
    }
    else {
        Comics = getData(key_data);
    }
}

function getData(key) {
    return JSON.parse(localStorage.getItem(key))
}

function setData(key, data){
    return localStorage.setItem(key, JSON.stringify(data))
}

function renderComic() {
    let htmls = Comics.map(function (comic) {
        return `
            <div class="comic-info">
                <img src="${comic.poster}" alt="">
                <h4>#${comic.id} - ${comic.namecomic}</h4>
                <h4>${comic.category}<h4>
                <button class="btn btn-success btn-sm onclick="change(${comic.id})">Edit</button>
                <button class="btn btn-primary d-none" onclick="update(${comic.id})">Update</button>
                <button class="btn btn-warning d-none" onclick="cancel(${comic.id})">Cancel</button>
                <button class="btn btn-danger btn-sm" onclick="remove(${comic.id})">Remove</button>
            </div>
        `
    })
    document.querySelector("#Comics").innerHTML = htmls.join("");
}
renderComic();

function createComic() {
    let namecomic = document.querySelector("#namecomic").value;
    if(!validation(namecomic)){
        alert('Xin mời nhập tên truyện!')
        return;
    }
    let poster = document.querySelector("#poster").value;
    let category1 = document.querySelector(".custom-form-control1");
    let category2 = document.querySelector(".custom-form-control2");
    let category3 = document.querySelector(".custom-form-control3");
    let id = findMaxId() + 1;
    if (category1.checked) {
        category1 = "Manhwa";
        let comic = new Comic(id, namecomic, poster, category1);
        Comics.push(comic);
        setData(key_data, Comics);
        renderComic();
        clearForm();
    }
    if (category2.checked) {
        category2 = "Manhua";
        let comic = new Comic(id, namecomic, poster, category2);
        Comics.push(comic);
        renderComic();
        clearForm();
    }
    if (category3.checked) {
        category3 = "Manga";
        let comic = new Comic(id, namecomic, poster, category3);
        Comics.push(comic);
        renderComic();
        clearForm();
    }

    // let comic = new Comic(id, namecomic, poster, category);

    // Comics.push(comic);
    // renderComic();
    // clearForm();
}

function clearForm() {
    document.querySelector("#namecomic").value = "";
    document.querySelector("#poster").value = "";
    document.querySelector("input[name=category]").checked = true;
}
function findMaxId() {
    let max = 0;
    for (let comic of Comics) {
        if (comic.id > max) {
            max = comic.id;
        }
    }
    return max;
}

function validation (field) {
    return field !=null && field.trim() !='';
}
function remove(id) {
    let confirmed = window.confirm("Bạn có muốn xóa truyện này không?");
    if(confirmed){
        let position = Comics.findIndex(function(comic) {
            return comic.id == id;
        })
        Comics.splice(position, 1);
        setData(key_data, Comics)
        renderComic();
    }
}
function ready() {
    init();
    renderComic();
}

ready();