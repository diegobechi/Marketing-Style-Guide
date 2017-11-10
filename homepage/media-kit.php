<?php
    // require 'vendor/autoload.php';
    $page_title = 'Media Kit';
    $page_description = 'Official ReCharge logos and resources.';
    $page_keywords = 'Recharge logo, logo, images, Executive headshots, Executive bios';
    $page_class = 'media-kit';
    $page_active = 'media-kit';
?>
<?php include('includes/header.php'); ?>
<div class="rc_section__container">
    <div class="rc_section--media-kit rc_text--center">
        <div class="media-kit__header">
            <div class="media-kit__header__title">
                <h1>Logos &amp; resources</h1>
            </div>
            <div class="media-kit__header__description">
                <p>These are official ReCharge graphics that you can include on your webpage, in your mobile application, or in printed material.</p>
            </div>
            <div class="logos__download">
                <button id="download-link" class="rc_button rc_button_large rc_button_primary logos__download__link" href="/downloads/ReCharge-Logos.zip" download>Download assets</a>
            </div>
        </div>
        <div class="media-kit__container">
            <div class="rc_layout">
                <div class="rc_layout__sm__6">
                    <div class="rc_layout">
                        <div class="rc_layout__full">
                            <div class="logos__rc_layout__item logos__rc_layout__item--full logos__rc_layout__item--white">
                                <img src="/assets/images/media-kit/RCP-full-logo-color.svg">
                            </div>
                        </div>
                        <div class="rc_layout__xs__6">
                            <div class="logos__rc_layout__item logos__rc_layout__item--white">
                                <img class="logos__rc_layout__item__mark" src="/assets/images/media-kit/RCP_mark_blue.svg">
                            </div>
                        </div>
                        <div class="rc_layout__xs__6">
                            <div class="logos__rc_layout__item logos__rc_layout__item--white">
                                <img class="logos__rc_layout__item__mark" src="/assets/images/media-kit/RCP_mark_grey.svg">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="rc_layout__sm__6">
                    <div class="rc_layout">
                        <div class="rc_layout__full">
                            <div class="logos__rc_layout__item logos__rc_layout__item--full logos__rc_layout__item--black">
                                <img src="/assets/images/media-kit/RCP-full-logo-white.svg">
                            </div>
                        </div>
                        <div class="rc_layout__xs__6">
                            <div class="logos__rc_layout__item logos__rc_layout__item--white">
                                <img class="logos__rc_layout__item__mark" src="/assets/images/media-kit/RCP_mark_black.svg">
                            </div>
                        </div>
                        <div class="rc_layout__xs__6">
                            <div class="logos__rc_layout__item logos__rc_layout__item--black">
                                <img class="logos__rc_layout__item__mark" src="/assets/images/media-kit/RCP_mark_white.svg">
                            </div>
                        </div>
                    </div>
                </div>
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
<?php include('includes/footer.php'); ?>
