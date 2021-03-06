<?php
    $page_title = 'Media Kit';
    $page_description = 'Official ReCharge logos and resources.';
    $page_keywords = 'Recharge logo, logo, images, Executive headshots, Executive bios';
    $page_class = 'media-kit';
    $page_active = 'media-kit';
?>

<?php include('templates/static/header.php'); ?>

<div class="rc_text-banner__container">
    <div class="rc_text-banner">
        <div class="rc_text-banner__header">
            <div class="rc_text-banner__header__title">
                <h1>Logos &amp; resources</h1>
            </div>
            <div class="rc_text_banner__header__description">
                <p>These are official ReCharge graphics that you can include on your webpage, in your mobile application, or in printed material.</p>
                <div class="logos__download">
                    <a href="/downloads/ReCharge-Logos.zip" id="download-link" class="rc_button rc_button_large rc_button_primary logos__download__link" download>Download assets</a>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="rc_layout__background">
    <div class="rc_layout__container">
        <div class="rc_layout">
            <div class="rc_layout__xs__12 rc_layout__md__6 rc_logo">
                <div class="rc_shadow_level1 rc_bg_white rc_logo_full">
                    <img src="/assets/images/media-kit/RCP-full-logo-color.svg">
                </div>
            </div>
            <div class="rc_layout__xs__12 rc_layout__md__6 rc_logo">
                <div class="rc_shadow_level1 rc_bg_grey rc_logo_full">
                    <img src="/assets/images/media-kit/RCP-full-logo-white.svg">
                </div>
            </div>
        </div>
        <div class="rc_layout">
            <div class="rc_layout__xs__6 rc_layout__md__3 rc_logo">
                <div class="rc_shadow_level1 rc_bg_white rc_logo_icon">
                    <img class="logos__rc_layout__item__mark" src="/assets/images/media-kit/RCP_mark_blue.svg">
                </div>
            </div>
            <div class="rc_layout__xs__6 rc_layout__md__3 rc_logo">
                <div class="rc_shadow_level1 rc_bg_grey rc_logo_icon">
                    <img class="logos__rc_layout__item__mark" src="/assets/images/media-kit/RCP_mark_white.svg">
                </div>
            </div>
            <div class="rc_layout__xs__6 rc_layout__md__3 rc_logo">
                <div class="rc_shadow_level1 rc_bg_white rc_logo_icon">
                    <img class="logos__rc_layout__item__mark" src="/assets/images/media-kit/RCP_mark_black.svg">
                </div>
            </div>
            <div class="rc_layout__xs__6 rc_layout__md__3 rc_logo">
                <div class="rc_shadow_level1 rc_bg_white rc_logo_icon">
                    <img class="logos__rc_layout__item__mark" src="/assets/images/media-kit/RCP_mark_grey.svg">
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    $(function() {
        $('.logos__grid').click(function() {
            $('#download-link')[0].click();
        })
    });
</script>

<?php include('templates/static/footer.php'); ?>