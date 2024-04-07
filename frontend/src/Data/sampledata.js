
const grocerydata = 
[
    {
      "Name": "Yellow Onion",
      "Price": "16.59",
      "Unit": "25 lbs",
      "URL": "https://www.chefstore.com/p/yellow-onions-25-lb_1015965/"
    },
    {
      "Name": "Peeled Garlic",
      "Price": "89.29",
      "Unit": "20 lbs",
      "URL": "https://www.chefstore.com/p/california-peeled-garlic-5-lb_3617665/"
    },
    {
      "Name": "Cilantro",
      "Price": "$51.45",
      "Unit": "5 dozen",
      "URL": "https://www.chefstore.com/p/river-fresh-farms-bunch-cilantro_3389241/"
    },
    {
      "Name": "Red Onion",
      "Price": "$17.99",
      "Unit": "25 lbs",
      "URL": "https://www.chefstore.com/p/jumbo-red-onions_6431738/"
    },
    {
      "Name": "Ginger",
      "Price": "$107.97",
      "Unit": "30 lbs",
      "URL": "https://www.chefstore.com/p/ginger-root-10-lb_7328855/"
    },
    {
      "Name": "Zucchini",
      "Price": "$14.69",
      "Unit": "20 lbs",
      "URL": "https://www.chefstore.com/p/green-zucchini-squash_3468279/"
    },
    {
      "Name": "Potato",
      "Price": "$13.69",
      "Unit": "50 lbs",
      "URL": "https://www.chefstore.com/p/russet-potatoes-2_2055960/"
    },
    {
      "Name": "Roma Tomato",
      "Price": "$25.59",
      "Unit": "25 lbs",
      "URL": "https://www.chefstore.com/p/roma-tomatoes_2015899/"
    },
    {
      "Name": "Tomato",
      "Price": "$43.96",
      "Unit": "20 lbs",
      "URL": "https://www.chefstore.com/p/tomatoes-5-lb-tray_3699671/"
    },
    {
      "Name": "American Eggplant",
      "Price": "$85.58",
      "Unit": "20 ct",
      "URL": "https://www.chefstore.com/p/pam-pak-eggplant_5940608/"
    },
    {
      "Name": "Carrot",
      "Price": "$14.09",
      "Unit": "25 lbs",
      "URL": "https://www.chefstore.com/p/juice-carrots-25-lb_2243245/"
    },
    {
      "Name": "Orange",
      "Price": "$27.27",
      "Unit": "30 lbs",
      "URL": "https://www.chefstore.com/p/oranges-10-lb-bag_6980364/"
    },
    {
      "Name": "Lemon",
      "Price": "$34.23",
      "Unit": "35 lbs",
      "URL": "https://www.chefstore.com/p/lemons-5-lb-bag_3626122/"
    },
    {
      "Name": "Green Chili Peppers",
      "Price": "$5.69",
      "Unit": "1 lb",
      "URL": "https://www.chefstore.com/p/del-destino-fire-roasted-diced-green-chili-peppers_4269107/"
    },
    {
      "Name": "Firm Tofu",
      "Price": "$23.12",
      "Unit": "144 oz",
      "URL": "https://www.chefstore.com/p/house-foods-tofu-firm_2088473/"
    },
    {
      "Name": "Broccoli",
      "Price": "$25.99",
      "Unit": "20 lbs",
      "URL": "https://www.chefstore.com/p/cross-valley-farms-broccoli-crown-iceless-box-fresh-ref_8355281/"
    },
    {
      "Name": "Cabbage",
      "Price": "$18.29",
      "Unit": "30 lbs",
      "URL": "https://www.chefstore.com/p/napa-cabbage-30-lb_9074451/"
    },
    {
      "Name": "Cauliflower",
      "Price": "$31.09",
      "Unit": "12 ct",
      "URL": "https://www.chefstore.com/p/cauliflower_6681788/"
    },
    {
      "Name": "Lettuce",
      "Price": "$24.99",
      "Unit": "24 pc",
      "URL": "https://www.chefstore.com/p/green-leaf-lettuce_7010598/"
    },
    {
      "Name": "Spinach",
      "Price": "$27.19",
      "Unit": "15 lbs",
      "URL": "https://www.chefstore.com/p/bag-whole-leaf-spinach_3026443/"
    },
    {
      "Name": "Celery",
      "Price": "$25.99",
      "Unit": "24 ct",
      "URL": "https://www.chefstore.com/p/celery-24-count_7868166/"
    },
    {
      "Name": "Mint",
      "Price": "$8.29",
      "Unit": "1 lb",
      "URL": "https://www.chefstore.com/p/fresh-mint_9485944/"
    },
    {
      "Name": "Green Bell Pepper",
      "Price": "$30.49",
      "Unit": "25 lb",
      "URL": "https://www.chefstore.com/p/green-bell-peppers-choppers_9854034/"
    },
    {
      "Name": "Red Bell Pepper",
      "Price": "$67.09",
      "Unit": "25 lb",
      "URL": "https://www.chefstore.com/p/red-bell-peppers-25-lb_2352956/"
    },
    {
      "Name": "Jalapeno",
      "Price": "$14.09",
      "Unit": "10 lb",
      "URL": "https://www.chefstore.com/p/jalapeno-peppers-10-lb_7232048/"
    },
    {
      "Name": "Seranno",
      "Price": "$19.99",
      "Unit": "10 lb",
      "URL": "https://www.chefstore.com/p/serrano-peppers_0998039/"
    },
    {
      "Name": "Chicken Leg",
      "Price": "$33.69",
      "Unit": "40 lbs",
      "URL": "https://www.chefstore.com/p/koch-halal-chicken-drumsticks-bulk_2288479/"
    },
    {
      "Name": "Chicken Thigh",
      "Price": "$106.69",
      "Unit": "40 lbs",
      "URL": "https://www.chefstore.com/p/boneless-skinless-chicken-thigh-meat_3907128/"
    },
    {
      "Name": "Chicken Breast",
      "Price": "$117.29",
      "Unit": "40 lbs",
      "URL": "https://www.chefstore.com/p/trimmed-boneless-skinless-chicken-breast_5019564/"
    },
    {
      "Name": "Lamb Leg",
      "Price": "$209.58",
      "Unit": "42 lba",
      "URL": "https://www.chefstore.com/p/thomas-farms-halal-boneless-leg-of-lamb_2909325/"
    },
    {
      "Name": "Cut Goat",
      "Price": "$2.79",
      "Unit": "30 lba",
      "URL": "https://www.chefstore.com/p/halal-goat-6-way-cut_5923150/"
    },
    {
      "Name": "Swai Fish Fillets",
      "Price": "$186.54",
      "Unit": "24 lbs",
      "URL": "https://www.chefstore.com/p/icelandic-beer-battered-swai-fillets_9190503/"
    },
    {
      "Name": "Tilapia Fish Fillet",
      "Price": "$44.98",
      "Unit": "10 lbs",
      "URL": "https://www.chefstore.com/p/passport-tilapia-fillets-3-5-oz_7541726/"
    },
    {
      "Name": "Peas and Carrots",
      "Price": "$25.96",
      "Unit": "20 lbs",
      "URL": "https://www.chefstore.com/p/garden-fresh-peas-carrots_2444455/"
    },
    {
      "Name": "Frozen Peas",
      "Price": "$35.95",
      "Unit": "25 lbs",
      "URL": "https://www.chefstore.com/p/garden-fresh-green-peas_6179532/"
    },
    {
      "Name": "Fresh Okra",
      "Price": "$48.53",
      "Unit": "36 lbs",
      "URL": "https://www.chefstore.com/p/garden-fresh-cut-okra_7605704/"
    },
    {
      "Name": "Mixed Vegetables",
      "Price": "$39.99",
      "Unit": "30 lbs",
      "URL": "https://www.chefstore.com/p/garden-fresh-mixed-vegetables_4783060/"
    },
    {
      "Name": "Sriracha Hot Sauce",
      "Price": "$43.09",
      "Unit": "12 pc",
      "URL": "https://www.chefstore.com/p/kai-sriracha-hot-chili-sauce_1013526/"
    },
    {
      "Name": "Sambai Oelek Chili Paste",
      "Price": "$51.69",
      "Unit": "3 units",
      "URL": "https://www.chefstore.com/p/huy-fong-sambal-oelek-chili-paste_8742074/"
    },
    {
      "Name": "Lemon Juice",
      "Price": "$25.19",
      "Unit": "12 units",
      "URL": "https://www.chefstore.com/p/thirster-100-lemon-juice_0577148/"
    },
    {
      "Name": "Salt",
      "Price": "$14.18",
      "Unit": "50 lbs",
      "URL": "https://www.chefstore.com/p/diamond-crystal-plain-salt-25-lbs_5378260/"
    },
    {
      "Name": "Sugar",
      "Price": "$37.89",
      "Unit": "50 lbs",
      "URL": "https://www.chefstore.com/p/ch-granulated-pure-cane-sugar_8010746/"
    },
    {
      "Name": "All purpose Flour",
      "Price": "$43.29",
      "Unit": "50 lbs",
      "URL": "https://www.chefstore.com/p/gold-medal-all-purpose-flour_7339695/"
    },
    {
      "Name": "Tomato Sauce",
      "Price": "$44.79",
      "Unit": "6 PC",
      "URL": "https://www.chefstore.com/p/hunts-tomato-sauce_2000586/"
    },
    {
      "Name": "Tomato puree",
      "Price": "$30.39",
      "Unit": "6 PC",
      "URL": "https://www.chefstore.com/p/monarch-fancy-tomato-puree_4522785/"
    },
    {
      "Name": "Soybean Oil",
      "Price": "$31.99",
      "Unit": "560 fl oz",
      "URL": "https://www.chefstore.com/p/harvest-value-clear-soybean-salad-oil_1327055/"
    },
    {
      "Name": "Fry Oil",
      "Price": "$31.99",
      "Unit": "560 fl oz",
      "URL": "https://www.chefstore.com/p/harvest-value-canola-liquid-frying-oil_3327053/"
    },
    {
      "Name": "Whole Peeled Tomato",
      "Price": "$37.59",
      "Unit": "6 pc",
      "URL": "https://www.chefstore.com/p/san-benito-whole-peeled-pear-tomatoes-with-basil_8493694/"
    }
  ];
  

  const grocerydatavendor = grocerydata.map(item => {
    return {
      ...item,
      "Vendor": "chefstore"
    };
  });
  
  export default grocerydatavendor;
