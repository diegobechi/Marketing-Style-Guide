<?php
	$page_title = 'Checkout Funnel | Integrations';
	$page_description = 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas.';
	$page_keywords = 'ReferralCandy, Zapiet, Google Analytics, Cart Hook, Integrations, Shopify, Apps, Add-ons, Refferal, Littledata, Checkout Funnel';
	$page_class = 'integration__details';
	$page_active = 'integration__checkout-funnel';
?>
<?php include('../templates/static/header.php'); ?>

<div class="page__container">

	<div class="rc_layout__container">
		<div class="rc_layout">
			<div class="rc_layout__sm__4">
				<img src="/assets/images/integrations/checkout-funnel_logo.png" alt="Checkout Funnel logo" class="integration__details__logo">
			</div><!-- .grid__sm__4 -->
			<div class="rc_layout__sm__8">
				<div class="integration__details">
					<div class="integration__header">
						<h1 class="integration__title">Checkout Funnel</h1>
					</div><!-- .integration__header -->
					<div class="integration__info">
						<p><a href="https://carthook.com/checkout" target="_blank" class="integration__website">carthook.com/checkout</a></p>
						<p>CartHook Checkout offers a customizable one-page checkout and post purchase one-click upsells for your Shopify store to increase conversions and maximize average order value.  Easily sell ReCharge subscription products in your checkout and upsells.</p>
					</div><!-- .integration__info -->
					<h5>Supported features</h5>
					<ul class="integration__features rc_list_items">
						<li class="rc_tick_ok">Customizable one-page checkout with WYSIWYG editor to optimize for conversions.</li>
						<li class="rc_tick_ok">One-click post purchase upsells to maximize average order value - add up to 3 upsells and 3 downsells in each funnel.</li>
						<li class="rc_tick_ok">Works seamlessly with CartHook Recovery to track and email abandoned carts.</li>
						<li class="rc_tick_ok">Enterprise grade performance and support.</li>
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

<?php include('../templates/static/footer.php'); ?>