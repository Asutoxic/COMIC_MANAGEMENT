class Comic {
    constructor(id, namecomic, poster, category) {
        this.id = id;
        this.namecomic = namecomic;
        this.poster = poster;
        this.category = category;
    }
}
let Id = 0;
let Comics = []
const key_data = "comic_data";

function init() {
    if (getData(key_data) == null) {
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

function setData(key, data) {
    return localStorage.setItem(key, JSON.stringify(data))
}

function renderComic(Comics) {
    Comics.sort(function (comic_1, comic_2) {
        return comic_2.id - comic_1.id;
    });
    let htmls = Comics.map(function (comic) {
        return `
            <div class="comic-info">
                <img src="${comic.poster}" alt="">
                <h4>${comic.namecomic}</h4>
                <h4>${comic.category}<h4>
                <button class="btn btn-success btn-sm id="create-btn" onclick="change(${comic.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="remove(${comic.id})">Remove</button>
            </div>
        `
    })
    document.querySelector("#Comics").innerHTML = htmls.join("");
}
// renderComic();

function createComic() {
    let namecomic = document.querySelector("#namecomic").value;
    if (!validation(namecomic)) {
        alert('Xin mời nhập tên truyện!')
        return;
    }
    let poster = document.querySelector("#poster").value;
    if (!validation(poster)) {
        alert('Xin mời thêm poster!')
        return;
    }
    let category = document.querySelector("#category").value;
    if (!validation(category)) {
        alert('Xin mời nhập thể loại truyện!')
        return;
    }
    let id = findMaxId() + 1;
        let comic = new Comic(id, namecomic, poster, category);
        Comics.push(comic);
        setData(key_data, Comics);
        renderComic(Comics);
        clearForm();
    }

    function updateComic() {
        let namecomic = document.querySelector("#namecomic").value;
        let poster = document.querySelector("#poster").value;
        let category = document.querySelector("#category").value;
        // let id = Number(document.querySelector("#comicId").value);
        // console.log(Id);
      
        let comic = Comics.find(function (comic) {
          return comic.id == Id;
        });
        // console.log(comic);
        comic.namecomic = namecomic;
        comic.poster = poster;
        comic.category = category;
      
        setData(key_data, Comics);
        renderComic(Comics);
        cancel();
      }

function clearForm() {
    document.querySelector("#namecomic").value = "";
    document.querySelector("#poster").value = "";
    document.querySelector("#category").value = "";
    document.querySelector("#comicId").value = "0";
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

function validation(field) {
    return field != null && field.trim() != '';
}
function remove(id) {
    let confirmed = window.confirm("Bạn có muốn xóa truyện này không?");
    if (confirmed) {
        let position = Comics.findIndex(function (comic) {
            return comic.id == id;
        })
        Comics.splice(position, 1);
        setData(key_data, Comics)
        renderComic(Comics);
    }
}
function change(comicId) {
    Id = comicId
    let comic = Comics.find(function (comic) {
        return comic.id == comicId;
    });
    document.querySelector("#namecomic").value = comic.namecomic;
    document.querySelector("#poster").value = comic.poster;
    document.querySelector("#category").value = comic.category
    document.querySelector("#create-btn").classList.add("d-none");
    document.querySelector("#update-btn").classList.remove("d-none");
    document.querySelector("#cancel-btn").classList.remove("d-none");
}

function cancel() {
    clearForm();
    document.querySelector("#create-btn").classList.remove("d-none");
    document.querySelector("#update-btn").classList.add("d-none");
    document.querySelector("#cancel-btn").classList.add("d-none");
  }

  function search(searchInput) {
    let result = Comics.filter(function (comic) {
      return (
        comic.namecomic.toLowerCase().indexOf(searchInput.value.toLowerCase()) !=-1 
      );
    });
    renderComic(result);
  }

function Manhwa() {
    let result = Comics.filter (function (Manhwa) {
        return Manhwa.category.indexOf("Manhwa") != -1
    })
    renderComic(result)
}
function Manhua() {
    let result = Comics.filter (function (Manhua) {
        return Manhua.category.indexOf("Manhua") != -1
    })
    renderComic(result)
}
function Manga() {
    let result = Comics.filter (function (Manga) {
        return Manga.category.indexOf("Manga") != -1
    })
    renderComic(result)
}
function logout() {
    window.location.replace("index.html")
}
function ready() {
    init();
    renderComic(Comics);
}

ready();