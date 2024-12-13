<?php get_header(); ?>

<section class="hero">
    <div class="hero-content">
        <h1 class="fade-in">Optimisez Votre Potentiel Humain</h1>
        <p class="hero-subtitle fade-in">Découvrez les dernières avancées en biohacking et performance</p>
        <a href="#latest-articles" class="btn btn-primary fade-in">Explorer</a>
    </div>
</section>

<section id="latest-articles" class="articles-section">
    <div class="container">
        <h2 class="section-title">Articles Récents</h2>
        
        <div class="articles-grid">
            <?php
            $args = array(
                'post_type' => 'post',
                'posts_per_page' => 6
            );
            $query = new WP_Query($args);
            
            if ($query->have_posts()) :
                while ($query->have_posts()) : $query->the_post();
            ?>
                <article class="article-card fade-in">
                    <?php if (has_post_thumbnail()) : ?>
                        <div class="article-image">
                            <?php the_post_thumbnail('article-thumbnail'); ?>
                        </div>
                    <?php endif; ?>
                    
                    <div class="article-content">
                        <div class="article-meta">
                            <?php
                            $categories = get_the_category();
                            if ($categories) :
                                $category = $categories[0];
                            ?>
                                <a href="<?php echo get_category_link($category->term_id); ?>" class="category-tag">
                                    <?php echo $category->name; ?>
                                </a>
                            <?php endif; ?>
                            <span class="reading-time">
                                <?php echo get_reading_time(); ?> min de lecture
                            </span>
                        </div>
                        
                        <h3 class="article-title">
                            <a href="<?php the_permalink(); ?>">
                                <?php the_title(); ?>
                            </a>
                        </h3>
                        
                        <div class="article-excerpt">
                            <?php the_excerpt(); ?>
                        </div>
                        
                        <a href="<?php the_permalink(); ?>" class="read-more">
                            Lire la suite
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </a>
                    </div>
                </article>
            <?php
                endwhile;
                wp_reset_postdata();
            endif;
            ?>
        </div>
    </div>
</section>

<section class="categories-section">
    <div class="container">
        <h2 class="section-title">Explorer par Catégorie</h2>
        
        <div class="categories-grid">
            <?php
            $categories = get_categories(array(
                'orderby' => 'name',
                'parent' => 0
            ));
            
            foreach ($categories as $category) :
            ?>
                <a href="<?php echo get_category_link($category->term_id); ?>" class="category-card fade-in">
                    <div class="category-icon">
                        <?php echo get_category_icon($category->term_id); ?>
                    </div>
                    <h3><?php echo $category->name; ?></h3>
                    <p><?php echo $category->description; ?></p>
                </a>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<section id="newsletter" class="newsletter">
    <div class="container">
        <h2>Restez à la Pointe du Biohacking</h2>
        <p>Recevez nos meilleurs articles et conseils directement dans votre boîte mail</p>
        
        <form class="newsletter-form">
            <input type="email" class="newsletter-input" placeholder="Votre adresse email" required>
            <button type="submit" class="btn btn-primary">S'abonner</button>
        </form>
    </div>
</section>

<?php get_footer(); ?>
