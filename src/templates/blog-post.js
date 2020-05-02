import React, { useEffect } from 'react'
import { Link, graphql } from 'gatsby'
import * as svgs from '../utils/svgs'
import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'
import addCopyCodeButtons from '../utils/addCopyCodeButtons'

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const { frontmatter, html, excerpt } = data.markdownRemark

  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  // add copyCode button to any code divs in the markdown - loads after mount (DOM manipulation)
  useEffect(addCopyCodeButtons, [])

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={frontmatter.title} description={excerpt} />
      <article>
        {frontmatter.type && (
          <img src={svgs[frontmatter.type]} alt={frontmatter.type} />
        )}
        <header>
          <h1>{frontmatter.title}</h1>
          <p>{frontmatter.date}</p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: html }} />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul>
          {previous && (
            <li>
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            </li>
          )}
          {next && (
            <li>
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        type
      }
    }
  }
`
