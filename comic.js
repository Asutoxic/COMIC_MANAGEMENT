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
                "https://scontent.fsgn2-7.fna.fbcdn.net/v/t1.6435-9/71248127_2398076093802316_6464659180505530368_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=730e14&_nc_ohc=hfat99OfJR8AX89r170&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfDcRTTwItz1I8UQa0XFWNu_Mg9hlugpCmmmD0ygK_2mPg&oe=63C37005",
                "Manhua"),
            new Comic(2,
                "Đấu La Đại Lục",
                "https://i0.wp.com/gioitienhiep.com/wp-content/uploads/2019/09/7-1.jpg?w=840&ssl=1",
                "Manhua"),
            new Comic(3,
                "Hoa Sơn Tái Xuất",
                "https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/267524995_132970259158774_7741261522358046704_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=ErmHBDZFc4UAX95lLJn&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfCJwDd2dxUgVX-b1ACPCcpfisXk6L4ebEayYU6qR7KjHQ&oe=63A1729D",
                "Manhwa"),
            new Comic(4,
                "Cuồng Ma Tái Thế",
                "https://truyencapnhat.com/cdn/truyencapnhat/20210820/doc-truyen-tranh-thien-ma-than-quyet-trung-sinh.jpg",
                "Manhwa"),
            new Comic(5,
                "Ngã Lão Ma Thần",
                "https://st.ntcdntempv3.com/data/comics/55/nga-lao-ma-than-605.jpg",
                "Manhwa"),
            new Comic(6,
                "One Piece",
                "https://i.pinimg.com/originals/c3/64/37/c36437ddf516b5efb3aaeb081eed7901.jpg",
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