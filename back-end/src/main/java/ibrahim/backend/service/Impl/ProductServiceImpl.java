package ibrahim.backend.service.Impl;

import ibrahim.backend.dto.ProductRequest;
import ibrahim.backend.dto.ProductResponse;
import ibrahim.backend.entity.Product;
import ibrahim.backend.exception.DuplicateResourceException;
import ibrahim.backend.exception.ResourceNotFoundException;
import ibrahim.backend.mapper.ProductMapper;
import ibrahim.backend.repository.ProductRepository;
import ibrahim.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    @Override
    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(productMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", id));
        return productMapper.toResponse(product);
    }

    @Override
    public ProductResponse createProduct(ProductRequest request) {
        if (productRepository.existsBySku(request.getSku())) {
            throw new DuplicateResourceException("Product with SKU '" + request.getSku() + "' already exists");
        }
        Product product = productMapper.toEntity(request);
        Product savedProduct = productRepository.save(product);
        return productMapper.toResponse(savedProduct);
    }

    @Override
    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", id));

        if (!existingProduct.getSku().equals(request.getSku()) && productRepository.existsBySku(request.getSku())) {
            throw new DuplicateResourceException("Product with SKU '" + request.getSku() + "' already exists");
        }

        productMapper.updateEntity(existingProduct, request);
        Product updatedProduct = productRepository.save(existingProduct);
        return productMapper.toResponse(updatedProduct);
    }

    @Override
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", id));
        productRepository.delete(product);
    }

    @Override
    public List<ProductResponse> getProductsByCategory(String category) {
        return productRepository.findByCategory(category)
                .stream()
                .map(productMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductResponse> searchProducts(String name) {
        return productRepository.findByNameContainingIgnoreCase(name)
                .stream()
                .map(productMapper::toResponse)
                .collect(Collectors.toList());
    }
}
