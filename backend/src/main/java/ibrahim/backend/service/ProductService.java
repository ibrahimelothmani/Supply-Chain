package ibrahim.backend.service;

import ibrahim.backend.dto.ProductRequest;
import ibrahim.backend.dto.ProductResponse;

import java.util.List;

public interface ProductService {

    List<ProductResponse> getAllProducts();

    ProductResponse getProductById(Long id);

    ProductResponse createProduct(ProductRequest request);

    ProductResponse updateProduct(Long id, ProductRequest request);

    void deleteProduct(Long id);

    List<ProductResponse> getProductsByCategory(String category);

    List<ProductResponse> searchProducts(String name);
}
