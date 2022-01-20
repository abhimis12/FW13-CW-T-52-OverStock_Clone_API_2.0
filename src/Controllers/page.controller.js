const { Router } = require("express")
const crudController = require("./crud.controller")
const Page = require("../Models/page.model")
const router = Router()
const { fieldWise } = require("../Middlewares/multer")

function CreateObject(name, imgUrl) {
  return {
    name,
    imgUrl,
  }
}

const arr = []

for (let i = 1; i <= 12; i++) {
  arr.push({ name: `c${i}img` })
  arr.push({ name: `c${i}nimg` })
}

arr.push({ name: "imgUrl" })
arr.push({ name: "img1" })
arr.push({ name: "img2" })
arr.push({ name: "imbImg1" })
arr.push({ name: "imbImg2" })

router.post("/create", fieldWise(arr), async (req, res) => {
  try {
    const imgFolder = req.files
    let category = []
    let moreCategory = []
    for (let i = 1; i <= 12; i++) {
      let a = "req.body.c" + i
      let b = "imgFolder.c" + i + "img[0].location"
      let c = "req.body.c" + i + "n"
      let d = "imgFolder.c" + i + "nimg[0].location"
      a = eval(a)
      b = eval(b)
      c = eval(c)
      d = eval(d)
      category.push(CreateObject(a, b))
      moreCategory.push(CreateObject(c, d))
    }
    // const category = [
    //   CreateObject(req.body.c1,imgFolder.c1img[0].location),
    //   CreateObject(req.body.c2,imgFolder.c2img[0].location),
    //   CreateObject(req.body.c3,imgFolder.c3img[0].location),
    //   CreateObject(req.body.c4,imgFolder.c4img[0].location),
    //   CreateObject(req.body.c5,imgFolder.c5img[0].location),
    //   CreateObject(req.body.c6,imgFolder.c6img[0].location),
    //   CreateObject(req.body.c7,imgFolder.c7img[0].location),
    //   CreateObject(req.body.c8,imgFolder.c8img[0].location),
    //   CreateObject(req.body.c9,imgFolder.c9img[0].location),
    //   CreateObject(req.body.c10,imgFolder.c10img[0].location),
    //   CreateObject(req.body.c11,imgFolder.c11img[0].location),
    //   CreateObject(req.body.c12,imgFolder.c12img[0].location)
    // ]

    // const moreCategory = [
    //   CreateObject(req.body.c2n,imgFolder.c2nimg[0].location),
    //   CreateObject(req.body.c2n,imgFolder.c2nimg[0].location),
    //   CreateObject(req.body.c2n,imgFolder.c2nimg[0].location),
    //   CreateObject(req.body.c2n,imgFolder.c2nimg[0].location),
    //   CreateObject(req.body.c2n,imgFolder.c2nimg[0].location),
    //   CreateObject(req.body.c2n,imgFolder.c2nimg[0].location),
    //   CreateObject(req.body.c2n,imgFolder.c2nimg[0].location),
    //   CreateObject(req.body.c2n,imgFolder.c2nimg[0].location),
    //   CreateObject(req.body.c2n,imgFolder.c2nimg[0].location),
    //   CreateObject(req.body.c2n,imgFolder.c2nimg[0].location),
    //   CreateObject(req.body.c2n,imgFolder.c2nimg[0].location),
    //   CreateObject(req.body.c2n,imgFolder.c2nimg[0].location),
    //   CreateObject(req.body.c2n,imgFolder.c2nimg[0].location),
    //   CreateObject(req.body.c2n,imgFolder.c2nimg[0].location),
    //   CreateObject(req.body.c2n,imgFolder.c2nimg[0].location),
    //   {
    //     name: req.body.c2n,
    //     imgUrl: imgFolder.c2nimg[0].location,
    //   },
    //   {
    //     name: req.body.c3n,
    //     imgUrl: imgFolder.c3nimg[0].location,
    //   },
    //   {
    //     name: req.body.c4n,
    //     imgUrl: imgFolder.c4nimg[0].location,
    //   },
    //   {
    //     name: req.body.c5n,
    //     imgUrl: imgFolder.c5nimg[0].location,
    //   },
    //   {
    //     name: req.body.c6n,
    //     imgUrl: imgFolder.c6nimg[0].location,
    //   },
    //   {
    //     name: req.body.c7n,
    //     imgUrl: imgFolder.c7nimg[0].location,
    //   },
    //   {
    //     name: req.body.c8n,
    //     imgUrl: imgFolder.c8nimg[0].location,
    //   },
    //   {
    //     name: req.body.c9n,
    //     imgUrl: imgFolder.c9nimg[0].location,
    //   },
    //   {
    //     name: req.body.c10n,
    //     imgUrl: imgFolder.c10nimg[0].location,
    //   },
    //   {
    //     name: req.body.c11n,
    //     imgUrl: imgFolder.c11nimg[0].location,
    //   },
    //   {
    //     name: req.body.c12n,
    //     imgUrl: imgFolder.c12nimg[0].location,
    //   },
    // ]
    const page = await Page.create({
      pageName: req.body.pageName,
      imgUrl: imgFolder.imgUrl[0].location,
      img1: imgFolder.img1[0].location,
      img2: imgFolder.img2[0].location,
      text1: req.body.text1,
      text2: req.body.text2,
      text3: req.body.text3,
      text4: req.body.text4,
      category: category,
      imb1: {
        imgUrl: imgFolder.imbImg1[0].location,
        title: req.body.imgbt1,
        desc: req.body.desc1,
      },
      imb2: {
        imgUrl: imgFolder.imbImg2[0].location,
        title: req.body.imgbt2,
        desc: req.body.desc2,
      },
      moreCategory: moreCategory,
    })

    return res.status(201).send(page)
  } catch (error) {
    console.log(error.message)
    res.status(500).send(error.message)
  }
})

module.exports = router
