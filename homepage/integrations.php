<?php
	$page_title = 'Integrations Directory';
	$page_description = 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas.';
	$page_keywords = 'ReferralCandy, Zapiet, Google Analytics, Cart Hook, Integrations, Shopify, Apps, Add-ons, Refferal';
	$page_class = 'integrations';
	$page_active = 'integrations';
?>
<?php include('includes/header.php'); ?>


<div class="rc_section__container">
	<div class="rc_section--integrations-directory rc_text--center">
		<div class="rc_text_banner__header">
			<div class="rc_text_banner__header__title">
				<h1>Integrations directory</h1>
			</div>
			<div class="rc_text_banner__header__description">
				<p>Seamless integrations so that all the different parts of your business can work together.</p>
			</div>
		</div>
		<div class="rc_text_banner__container integrations__container">
			<div class="integrations__directory rc_text--left">
				<?php include('integration/_listing.php'); ?>
			</div>
		</div>
	</div>
</div>

<?php include('includes/footer.php'); ?>