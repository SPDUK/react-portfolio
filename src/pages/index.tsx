import React from 'react'

import { Layout } from '../components/Layout/Layout'
import { SEO } from '../components/Seo'
import { Hero } from '../components/Hero/Hero'
import { Technologies } from '../components/Technologies'

const BlogIndex = () => (
  <Layout>
    <SEO title="Home" />
    <Hero />
    <Technologies />
  </Layout>
)

export default BlogIndex
