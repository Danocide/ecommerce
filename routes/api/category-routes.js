const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const catagory = await Category.findAll({
      attributes: ['id', 'category_name'],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
    });
    res.status(200).json(catagory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!id) {
      res.status(404).json({ message: 'No category found!' });
      return;
    };

    res.status(200).json(id);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  try {
    const newCatagory = await Category.create({
      id: req.body.id,
      category_name: req.body.category_name
    });
    res.status(200).json(newCatagory);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', (req, res) => {
  try {
    const updateCatagory = Category.update(
      { category_name: req.body.category_name },
      {
        where: {
          id: req.params.id,
        }
      }
    )
      .then((updateCatagory) => {
        if (!updateCatagory) {
          res.status(404).json({ message: "No Category found!" });
          return;
        }
      })
    res.status(200).json(updateCatagory)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteCatagory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteCatagory) {
      res.status(404).json({ message: 'No category found!' });
      return;
    }

    res.status(200).json(deleteCatagory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
