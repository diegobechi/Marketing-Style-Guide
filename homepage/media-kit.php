<?php
    // require 'vendor/autoload.php';
    $page_title = 'Media Kit';
    $page_description = 'Official ReCharge logos and resources.';
    $page_keywords = 'Recharge logo, logo, images, Executive headshots, Executive bios';
    $page_class = 'media-kit';
    $page_active = 'media-kit';
?>
<?php include('includes/header.php'); ?>

<div class="mediakit__block">
    <div class="logos text--center">
        <h1 class="logos__title">LOGOS &amp; RESOURCES</h1>
        <p class="logos__description">These are official ReCharge graphics that you can include on your webpage, in your mobile application, or in printed material.</p>
        <div class="layout__container logos__grid">
            <div class="layout">
                <div class="layout__full text--left">
                    <div class="logos__grid__description">
                        <p>Recharge full and mark only logos</p>
                        <p class="logos__grid__description__tiny">The white logos are designed for dark backgrounds.</p>
                    </div>
                </div>
                <div class="grid__sm__6">
                    <div class="layout">
                        <div class="layout__full">
                            <div class="logos__grid__item logos__grid__item--full logos__grid__item--white">
                                <img src="/assets/images/media-kit/RCP-full-logo-color.svg">
                            </div>
                        </div>
                        <div class="grid__xs__6">
                            <div class="logos__grid__item logos__grid__item--white">
                                <img class="logos__grid__item__mark" src="/assets/images/media-kit/RCP_mark_blue.svg">
                            </div>
                        </div>
                        <div class="grid__xs__6">
                            <div class="logos__grid__item logos__grid__item--white">
                                <img class="logos__grid__item__mark" src="/assets/images/media-kit/RCP_mark_grey.svg">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="grid__sm__6">
                    <div class="layout">
                        <div class="layout__full">
                            <div class="logos__grid__item logos__grid__item--full logos__grid__item--black">
                                <img src="/assets/images/media-kit/RCP-full-logo-white.svg">
                            </div>
                        </div>
                        <div class="grid__xs__6">
                            <div class="logos__grid__item logos__grid__item--white">
                                <img class="logos__grid__item__mark" src="/assets/images/media-kit/RCP_mark_black.svg">
                            </div>
                        </div>
                        <div class="grid__xs__6">
                            <div class="logos__grid__item logos__grid__item--black">
                                <img class="logos__grid__item__mark" src="/assets/images/media-kit/RCP_mark_white.svg">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="logos__download">
            <a id="download-link" class="logos__download__link" href="/downloads/ReCharge-Logos.zip" download>Download logo kit</a>
            <p class="logos__download__file-ext">EPS, SVG, PNG</p>
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
