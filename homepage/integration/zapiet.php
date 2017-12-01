<?php
	$page_title = 'Zapiet | Integrations';
	$page_description = 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas.';
	$page_keywords = 'ReferralCandy, Zapiet, Google Analytics, Cart Hook, Integrations, Shopify, Apps, Add-ons, Refferal';
	$page_class = 'integration__details';
	$page_active = 'integration__zapiet';
?>
<?php include('../templates/static/header.php'); ?>

<div class="rc_layout__container">
	<div class="rc_layout">
		<div class="rc_layout__sm__4">
			<img src="/assets/images/integrations/logo_zapiet.png" alt="Zapiet logo" class="integration__details__logo">
		</div><!-- .grid__sm__4 -->
		<div class="rc_layout__sm__8">
			<div class="integration__details">
				<div class="integration__header">
					<h1 class="integration__title">Zapiet</h1>
				</div><!-- .integration__header -->
				<div class="integration__info">
					<?php /* <p><a href="http://www.sweettoothrewards.com" target="_blank" class="integration__website">www.sweettoothrewards.com</a></p> */ ?>
					<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore.</p>
				</div><!-- .integration__info -->
				<h5>Supported features</h5>
				<ul class="integration__features rc_list_items">
					<li class="rc_tick_ok">At vero eos et accusamus et iusto odio dignissimos.</li>
					<li class="rc_tick_ok">Similique sunt in culpa qui officia deserunt mollitia animi.</li>
					<li class="rc_tick_ok">Id est laborum et dolorum fuga.</li>
					<li class="rc_tick_ok">Et harum quidem rerum facilis est et expedita distinctio.</li>
					<li class="rc_tick_ok">Nam libero tempore, cum soluta nobis est eligendi.</li>
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