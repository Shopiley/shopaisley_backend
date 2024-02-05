/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, NotFoundException, Res} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @Version('1')
  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product successfully created' })
  async create(@Body() createProductDto: CreateProductDto, @Res() response) {
    const data = await this.productService.create(createProductDto);
    response.status(HttpStatus.CREATED).json({
      status: 'success',
      message: 'Product created successfully',
      data: data,
    });
  }


  // @Version('1')
  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Products successfully retrieved' })
  @ApiResponse({ status: 404, description: 'Products not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 503, description: 'Service unavailable' })
  async findAll(@Res() response) {
    const data = await this.productService.findAll();

    response.status(HttpStatus.OK).json({
      status: 'success',
      message: 'Product retrieved successfully',
      data: data,
    });
  }


  // @Version('1')
  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({ status: 200, description: 'Product successfully retrieved' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findOne(@Param('id') id: string, @Res() response) {
    try {
      const product = await this.productService.findOne(id);

      if (!product) {
        throw new NotFoundException(`Product with id: ${id} not found`); // Use a suitable error type
      }

      response.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Product retrieved successfully',
        data: product,
      });
      
    } catch (error) {
      response.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });

    }
  }


  // @Version('1')
  @Get('subcategory/:subCategory')
  @ApiOperation({ summary: 'Get product by Sub Category' })
  @ApiResponse({ status: 200, description: 'Products successfully retrieved' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findBySubCategory(@Param('subCategory') subCategory: string, @Res() response) {
    try {
      const product = await this.productService.findProductBySubCategory(subCategory);
      if (!product) {
        throw new NotFoundException(`Products in sub-category: ${subCategory} not found`); 
      }

      response.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Products retrieved successfully',
        data: product,
      });
      
    } catch (error) {
      response.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });

    }
  }


  // @Version('1')
  @Get('category/:category')
  @ApiOperation({ summary: 'Get product by Category' })
  @ApiResponse({ status: 200, description: 'Products successfully retrieved' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findByCategory(@Param('category') category: string, @Res() response) {
    try {
      const product = await this.productService.findProductByCategory(category);

      if (!product) {
        throw new NotFoundException(`Products in category: ${category} not found`); 
      }

      response.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Products retrieved successfully',
        data: product,
      });
      
    } catch (error) {
      response.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });

    }
  }


  // @Version('1')
  @Patch(':id')
  @ApiOperation({ summary: 'Update product by ID' })
  @ApiResponse({ status: 200, description: 'Product successfully updated' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Res() response) {
    try {
      const productToDelete = await this.productService.findOne(id);

      if (!productToDelete) {
        throw new NotFoundException(`Product with id: ${id} not found`); 
      }
      
      const updatedProduct = await this.productService.update(id, updateProductDto);

      response.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Product updated successfully',
        data: updatedProduct,
      });
      
    } catch (error) {
      response.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });

    }
  }


  // @Version('1')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete product by ID' })
  @ApiResponse({ status: 200, description: 'Product successfully deleted' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async remove(@Param('id') id: string, @Res() response) {
    try {
      const productToDelete = await this.productService.findOne(id);

      if (!productToDelete) {
        throw new NotFoundException(`Product with id: ${id} not found`); 
      }
      
      this.productService.remove(id);

      response.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Product deleted successfully',
        data: productToDelete,
      });
      
    } catch (error) {
      response.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });

    }
  }

}