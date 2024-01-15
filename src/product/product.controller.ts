import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }


// @Version('1')
@ApiOperation({ summary: 'Get product by products ID' })
@Get(':id')
@ApiResponse({ status: 201, description: 'Product successfully found' })
@ApiResponse({ status: 404, description: 'Product does not exist' })
async findOne(@Param('id') id: string) {
  try {
    const product = await this.productService.findOne(id);
    return product;
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    throw error; // Re-throw other errors
  }
}
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
