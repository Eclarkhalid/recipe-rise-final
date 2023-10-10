import recipe1 from '../images/recipe11.jpg'
import recipe2 from '../images/recipe12.jpg'
import recipe3 from '../images/recipe13.jpg'
import recipe4 from '../images/recipe14.jpg'

import truckFast from '../assets/icons/truck-fast.svg'
import shieldTick from '../assets/icons/shield-tick.svg'
import support from '../assets/icons/support.svg'

import customer1 from '../images/user.jpg'
import customer2 from '../images/user1.jpg'

import { facebook } from '../assets/icons'
import { twitter } from '../assets/icons'
import { instagram } from '../assets/icons'

export const recipes = [
  {
      imgURL: recipe1,
      name: "Fresh Caprese Salad",
      author: "Bob Nick",
  },
  {
    imgURL: recipe2,
    name: "recipe 2",
    author: "Martin Lil",
  },
  {
    imgURL: recipe3,
    name: "recipe 3",
    author: "Mary Janet",
  },
  {
    imgURL: recipe4,
    name: "recipe 4",
    author: "Christine W",
  },
];

// services
export const services = [
  {
    imgURL: truckFast,
    label: "Fast Recipe Delivery",
    subtext: "Enjoy seamless shopping with our fast and reliable recipe delivery service."
  },
  {
    imgURL: shieldTick,
    label: "Recipe Inspiration",
    subtext: "Discover new and exciting recipes to try, curated by our team of culinary experts."
  },
  {
    imgURL: support,
    label: "Dedicated Support",
    subtext: "Our dedicated team is here to assist you with any recipe questions or needs you may have."
  },
];

// reviews
export const reviews = [
  {
    imgURL: customer1,
    customerName: "John Smith",
    rating: 4.5,
    feedback: "The attention to detail and the quality of the recipes exceeded my expectations. I'm already cooking my way through the cookbook!"
  },
  {
    imgURL: customer2,
    customerName: "Jane Doe",
    rating: 4.5,
    feedback: "The recipes not only met but exceeded my expectations. I've learned so much about cooking and my family loves the new dishes I'm making."
  },
];

export const footerLinks = [
  {
    title: "Recipes",
    links: [
      { name: "Appetizers", link: "/" },
      { name: "Main courses", link: "/" },
      { name: "Side dishes", link: "/" },
      { name: "Desserts", link: "/" },
      { name: "Drinks", link: "/" },
    ],
  },
  {
    title: "Recipe categories",
    links: [
      { name: "Breakfast", link: "/" },
      { name: "Lunch", link: "/" },
      { name: "Dinner", link: "/" },
      { name: "Snacks", link: "/" },
      { name: "Holidays", link: "/" },
    ],
  },
  {
    title: "Tips & tricks",
    links: [
      { name: "How to cook", link: "/" },
      { name: "Food safety", link: "/" },
      { name: "Kitchen hacks", link: "/" },
      { name: "Recipes for beginners", link: "/" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { name: "recipes@example.com", link: "mailto:recipes@example.com" },
      { name: "+1-800-RECIPES", link: "tel:+1-800-RECIPES" },
    ],
  },
];

export const socialMedia = [
  { src: facebook, alt: "facebook logo" },
  { src: twitter, alt: "twitter logo" },
  { src: instagram, alt: "instagram logo" },
];
