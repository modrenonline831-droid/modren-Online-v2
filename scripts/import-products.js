// scripts/import-products.js
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

const products = [
  // انسخ محتويات portfolioItems هنا (الكامل)
  // تأكد من تحويل الحقول مثل images, colors, details, features, tags إلى مصفوفات
]

async function importProducts() {
  for (const product of products) {
    // احذف id إذا كان موجوداً (لأن Supabase ستضيفه تلقائياً)
    const { id, ...data } = product
    const { error } = await supabase.from('products').insert([data])
    if (error) {
      console.error('Error inserting product:', product.title, error)
    } else {
      console.log('Inserted:', product.title)
    }
  }
}

importProducts()