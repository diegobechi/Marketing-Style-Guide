<?php
	$page_title = 'Integrations Directory';
	$page_description = 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas.';
	$page_keywords = 'ReferralCandy, Zapiet, Google Analytics, Cart Hook, Integrations, Shopify, Apps, Add-ons, Refferal';
	$page_class = 'integrations';
	$page_active = 'integrations';
?>
<?php include('includes/header.php'); ?>


<div class="page__container">
	<div class="page__header">
		<div class="page__header__title">
			<h1>Integrations Directory</h1>
		</div><!-- .page__header__title -->
		<div class="page__header__description">
			<p>Seamless integrations so that all the different parts of your business can work together.</p>
		</div><!-- .page__header__description -->
	</div>

	<div class="integration__directory">
		<?php include('integration/_listing.php'); ?>
	</div><!-- .integration__directory -->
</div><!-- .page__container -->

<?php include('includes/footer.php'); ?>