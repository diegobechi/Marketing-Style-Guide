<?php
	$page_title = 'Integrations Directory';
	$page_description = '';
	$page_keywords = 'ReferralCandy, Zapiet, Google Analytics, Cart Hook, Integrations, Shopify, Apps, Add-ons, Refferal';
	$page_class = 'integrations';
	$page_active = 'integrations';
?>
<?php include('templates/static/header.php'); ?>


<div class="rc_text-banner__container">
    <div class="rc_text-banner">
        <div class="rc_text-banner__header">
			<div class="rc_text-banner__header__title">
				<h1>Integrations directory</h1>
			</div>
			<div class="rc_text-banner__header__description">
				<p>Seamless integrations so that all the different parts of your business can work together.</p>
			</div>
		</div>
		<div class="rc_layout__background integrations__container">
			<div class="integrations">
				<?php include('integration/_listing.php'); ?>
			</div>
		</div>
	</div>
</div>

<?php include('templates/static/footer.php'); ?>