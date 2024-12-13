<?php
// Fonctions du thème Biohacking France

// Support du thème
function biohacking_theme_support() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    add_theme_support('custom-logo');
    add_theme_support('automatic-feed-links');
    add_theme_support('customize-selective-refresh-widgets');
}
add_action('after_setup_theme', 'biohacking_theme_support');

// Enregistrement des menus
function biohacking_register_menus() {
    register_nav_menus(array(
        'primary-menu' => 'Menu Principal',
        'footer-menu' => 'Menu Footer'
    ));
}
add_action('init', 'biohacking_register_menus');

// Styles et scripts
function biohacking_enqueue_scripts() {
    wp_enqueue_style('biohacking-style', get_stylesheet_uri(), array(), '1.0.0');
    wp_enqueue_script('biohacking-script', get_template_directory_uri() . '/js/main.js', array('jquery'), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'biohacking_enqueue_scripts');

// Temps de lecture estimé
function get_reading_time() {
    $content = get_post_field('post_content', get_the_ID());
    $word_count = str_word_count(strip_tags($content));
    $reading_time = ceil($word_count / 200); // 200 mots par minute
    return $reading_time;
}

// Icônes des catégories
function get_category_icon($category_id) {
    $icons = array(
        'optimisation-cognitive' => '<svg>...</svg>',
        'nutrition' => '<svg>...</svg>',
        'sommeil' => '<svg>...</svg>',
        'exercice' => '<svg>...</svg>',
        'technologies' => '<svg>...</svg>',
        'meditation' => '<svg>...</svg>',
        'biometrie' => '<svg>...</svg>',
        'guides' => '<svg>...</svg>'
    );
    
    $category = get_category($category_id);
    $slug = $category->slug;
    
    return isset($icons[$slug]) ? $icons[$slug] : '<svg>...</svg>';
}

// Widgets
function biohacking_widgets_init() {
    register_sidebar(array(
        'name' => 'Sidebar',
        'id' => 'sidebar-1',
        'description' => 'Widgets de la sidebar principale',
        'before_widget' => '<div class="widget %2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h3 class="widget-title">',
        'after_title' => '</h3>'
    ));
}
add_action('widgets_init', 'biohacking_widgets_init');

// Excerpts personnalisés
function custom_excerpt_length($length) {
    return 20;
}
add_filter('excerpt_length', 'custom_excerpt_length', 999);

function custom_excerpt_more($more) {
    return '...';
}
add_filter('excerpt_more', 'custom_excerpt_more');

// Optimisation SEO
function add_meta_tags() {
    if (is_single()) {
        global $post;
        $excerpt = strip_tags($post->post_content);
        $excerpt = str_replace("", "'", $excerpt);
        $excerpt = substr($excerpt, 0, 155);
        echo '<meta name="description" content="' . $excerpt . '" />' . "\n";
    }
}
add_action('wp_head', 'add_meta_tags');

// Sécurité
function remove_version_info() {
    return '';
}
add_filter('the_generator', 'remove_version_info');

// Performance
function defer_parsing_of_js($url) {
    if (is_admin()) return $url;
    if (false === strpos($url, '.js')) return $url;
    return str_replace(' src', ' defer src', $url);
}
add_filter('script_loader_tag', 'defer_parsing_of_js', 10);
