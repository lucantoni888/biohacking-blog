<?php
// Configuration SEO WordPress

// 1. Structure des permaliens
update_option('permalink_structure', '/%category%/%postname%/');

// 2. Configuration Yoast SEO
$yoast_seo_options = array(
    'separator' => '|',
    'title-home-wpseo' => 'Blog Biohacking France | Optimisation Humaine et Performance',
    'metadesc-home-wpseo' => 'Découvrez les meilleures techniques de biohacking, optimisation cognitive, et amélioration des performances. Guides experts et conseils scientifiques.',
    'og_default_image' => '/images/biohacking-france-og.jpg',
    'twitter_site' => '@biohackingfr',
    'noindex-subpages-wpseo' => true,
);

// 3. Configuration du sitemap
add_filter('wpseo_sitemap_exclude_post_type', 'exclude_post_types', 10, 2);
function exclude_post_types($excluded, $post_type) {
    return $excluded || in_array($post_type, array('attachment', 'revision'));
}

// 4. Optimisation des images
add_filter('jpeg_quality', function($quality) {
    return 82;
});
add_image_size('article-featured', 1200, 630, true);
add_image_size('og-social', 1200, 630, true);

// 5. Configuration du cache
define('WP_CACHE', true);
define('COMPRESS_CSS', true);
define('COMPRESS_SCRIPTS', true);
define('CONCATENATE_SCRIPTS', true);
define('ENFORCE_GZIP', true);

// 6. Sécurité et performance
define('DISALLOW_FILE_EDIT', true);
define('WP_POST_REVISIONS', 5);
define('EMPTY_TRASH_DAYS', 7);

// 7. Schema.org markup
function add_schema_markup() {
    if (is_single()) {
        global $post;
        $schema = array(
            "@context" => "https://schema.org",
            "@type" => "Article",
            "headline" => get_the_title(),
            "datePublished" => get_the_date('c'),
            "dateModified" => get_the_modified_date('c'),
            "author" => array(
                "@type" => "Person",
                "name" => get_the_author()
            ),
            "publisher" => array(
                "@type" => "Organization",
                "name" => "Blog Biohacking France",
                "logo" => array(
                    "@type" => "ImageObject",
                    "url" => "/images/logo.png"
                )
            )
        );
        echo '<script type="application/ld+json">' . json_encode($schema) . '</script>';
    }
}
add_action('wp_head', 'add_schema_markup');

// 8. Optimisation mobile
add_action('wp_head', function() {
    echo '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
});

// 9. Configuration des en-têtes HTTP
header('Link: </wp-content/themes/style.css>; rel=preload; as=style');
header('Link: </wp-content/themes/script.js>; rel=preload; as=script');

// 10. Optimisation des commentaires
define('COMMENT_FLOOD_FILTER', true);
