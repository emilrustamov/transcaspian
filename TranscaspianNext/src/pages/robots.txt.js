export async function getServerSideProps({ res }) {
  const robotsContent = `
    User-agent: *
    Sitemap: https://transcaspiantours.com/sitemap.xml
    Disallow: /404/
    Disallow: /blocked/
    Disallow: /tool.php
    Disallow: /dashboard.php
    Disallow: /reviews.php
    Disallow: /index.php
    Disallow: /privacy-policy.php
    Disallow: /tripTip
    Disallow: /cookie-policy.php
    Disallow: /community.php
  `

  res.setHeader("Content-Type", "text/plain")
  res.write(robotsContent);
  res.end();

  return { props: {} }
}

const Robots = () => {

}

export default Robots;