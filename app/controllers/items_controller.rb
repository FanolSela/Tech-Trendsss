class ItemsController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  def index
    @items = Item.all

    render json: @items
  end

  def show
    render json: @item
  end

  def create
    @item = Item.new(item_params)

    if @item.save
      @Token = encode({id: @item.id})
      render json: {
        token: @token
        items: @item.attributes.except("password_digest")
      }, status: :created
    else
      render json: @item.errors, status: :unprocessable_entity
    end
  end

  def update
    if @item.update(item_params)
      render json: @item
    else
    render json: @item.errors, status: : unprocessable_entity
    end
  end

  def destroy
    @item.destroy
  end

end