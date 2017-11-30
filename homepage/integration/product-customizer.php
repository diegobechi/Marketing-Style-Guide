<?php
	$page_title = 'Product Customizer | Integrations';
	$page_description = 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas.';
	$page_keywords = 'ReferralCandy, Zapiet, Google Analytics, Cart Hook, Integrations, Shopify, Apps, Add-ons, Refferal, Littledata, Checkout Funnel, Product Customizer';
	$page_class = 'integration__details';
	$page_active = 'integration__product-customizer';
?>
<?php include('../templates/static/header.php'); ?>

<div class="page__container">

	<div class="rc_layout__container">
		<div class="rc_layout">
			<div class="rc_layout__sm__4">
				<img src="/assets/images/integrations/product-customizer_logo.png" alt="Product Customizer logo" class="integration__details__logo">
			</div><!-- .grid__sm__4 -->
			<div class="rc_layout__sm__8">
				<div class="integration__details">
					<div class="integration__header">
						<h1 class="integration__title">Product Customizer</h1>
					</div><!-- .integration__header -->
					<div class="integration__info">
						<p><a href="https://apps.shopify.com/product-customizer" target="_blank" class="integration__website">apps.shopify.com/product-customizer</a></p>
						<p>Product Customizer is an easy-to-use app with unparalleled service. Add an unlimited number of custom file uploads, dropdowns, text inputs, radio buttons, and checkbox options to provide the options you need to sell your products.</p>
					</div><!-- .integration__info -->
					<h5>Supported features</h5>
					<ul class="integration__features rc_list_items">
						<li class="rc_tick_ok">Customize your products with unlimited options</li>
						<li class="rc_tick_ok">Add file uploads, dropdowns, text inputs, radio buttons or checkboxes to your products</li>
						<li class="rc_tick_ok">Increase revenue with per option pricing</li>
						<li class="rc_tick_ok">Free installation and free support</li>
					</ul><!-- .integration__features -->
				</div><!-- .integration__details -->
			</div><!-- .grid__sm__8 -->
		</div><!-- .layout -->
	</div><!-- .container -->

</div><!-- .page__container -->

<div class="integration__explore">
	<div class="rc_layout__container">
		<h4>Explore other integrations</h4>
		<div class="rc_layout">
			<div class="rc_layout__full">
				<?php include('_listing.php'); ?>
			</div><!-- .layout__full -->
		</div><!-- .layout -->
	</div><!-- .container -->
</div><!-- .integration__explore -->

<?php include('../includes/footer.php'); ?>