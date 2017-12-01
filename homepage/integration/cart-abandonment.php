<?php
	$page_title = 'Cart Abandonment | Integrations';
	$page_description = 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas.';
	$page_keywords = 'ReferralCandy, Zapiet, Google Analytics, Cart Abandonment, Integrations, Shopify, Apps, Add-ons, Refferal';
	$page_class = 'integration__details';
	$page_active = 'integration__cart-abandonment';
?>
<?php include('../templates/static/header.php'); ?>

<div class="rc_layout__container">
	<div class="rc_layout">
		<div class="rc_layout__sm__4">
			<img src="/assets/images/integrations/cart-abandonment_logo.png" alt="CartHook logo" class="integration__details__logo">
		</div><!-- .grid__sm__4 -->
		<div class="rc_layout__sm__8">
			<div class="integration__details">
				<div class="integration__header">
					<h1 class="integration__title">Cart Abandonment</h1>
				</div><!-- .integration__header -->
				<div class="integration__info">
					<p><a href="https://carthook.com/recovery" target="_blank" class="integration__website">carthook.com/recovery</a></p>
					<p>CartHook helps you increase revenue by automatically tracking and emailing shoppers who start, but don’t finish your checkout process.  Leading ReCharge merchants depend on CartHook to recover 10% to 20% of their abandoned carts.</p>
				</div><!-- .integration__info -->
				<h5>Supported features</h5>
				<ul class="integration__features rc_list_items">
					<li class="rc_tick_ok">Capture email addresses of visitors as they’re typed on the checkout page, ensuring the maximum number of captured abandoned carts.</li>
					<li class="rc_tick_ok">Automatically send a customizable 3-part email campaign designed to bring customers back to your site to finish the purchase.</li>
					<li class="rc_tick_ok">Super simple integration let’s you get up and running in 30 minutes (seriously)</li>
					<li class="rc_tick_ok">Special pricing plan for ReCharge users: $19/mo + 6% of recovered revenue (or choose standard pricing)</li>
				</ul><!-- .integration__features -->
			</div><!-- .integration__details -->
		</div><!-- .grid__sm__8 -->
	</div><!-- .layout -->
</div><!-- .container -->

<div class="rc_layout__background integration__explore">
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